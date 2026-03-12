import MixinStorage "blob-storage/Mixin";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type ListingID = Nat;

  public type LeaseListing = {
    listingId : ListingID;
    nickname : Text;
    leaseCode : Text;
    splitRatio : Text;
    availability : Bool;
  };

  public type UserProfile = {
    name : Text;
  };

  // Internal state
  let leaseListings = Map.empty<ListingID, LeaseListing>();
  var nextListingId : ListingID = 0;
  let userProfiles = Map.empty<Principal, UserProfile>();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // Safe admin check that doesn't trap for unregistered callers
  func callerIsAdmin(caller : Principal) : Bool {
    switch (accessControlState.userRoles.get(caller)) {
      case (?(#admin)) { true };
      case (_) { false };
    };
  };

  // Public query — no auth required
  public query func getAllLeaseListings() : async [LeaseListing] {
    leaseListings.values().toArray();
  };

  // Admin-only: add a new lease listing
  public shared ({ caller }) func addLeaseListing(
    nickname : Text,
    leaseCode : Text,
    splitRatio : Text,
    availability : Bool
  ) : async LeaseListing {
    if (not callerIsAdmin(caller)) {
      Runtime.trap("Unauthorized");
    };
    let id = nextListingId;
    nextListingId += 1;
    let listing : LeaseListing = {
      listingId = id;
      nickname = nickname;
      leaseCode = leaseCode;
      splitRatio = splitRatio;
      availability = availability;
    };
    leaseListings.add(id, listing);
    listing;
  };

  // Admin-only: update an existing lease listing
  public shared ({ caller }) func updateLeaseListing(
    listingId : ListingID,
    nickname : Text,
    leaseCode : Text,
    splitRatio : Text,
    availability : Bool
  ) : async ?LeaseListing {
    if (not callerIsAdmin(caller)) {
      Runtime.trap("Unauthorized");
    };
    switch (leaseListings.get(listingId)) {
      case null { null };
      case (?_existing) {
        let updated : LeaseListing = {
          listingId = listingId;
          nickname = nickname;
          leaseCode = leaseCode;
          splitRatio = splitRatio;
          availability = availability;
        };
        leaseListings.add(listingId, updated);
        ?updated;
      };
    };
  };

  // Admin-only: delete a lease listing
  public shared ({ caller }) func deleteLeaseListing(listingId : ListingID) : async Bool {
    if (not callerIsAdmin(caller)) {
      Runtime.trap("Unauthorized");
    };
    switch (leaseListings.get(listingId)) {
      case null { false };
      case (?_) {
        leaseListings.remove(listingId);
        true;
      };
    };
  };
};
