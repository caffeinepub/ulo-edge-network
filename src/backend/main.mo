import Map "mo:core/Map";
import Array "mo:core/Array";
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

  module LeaseListing {
    public func compare(listing1 : LeaseListing, listing2 : LeaseListing) : Order.Order {
      compareByListingId(listing1, listing2);
    };

    public func compareByListingId(listing1 : LeaseListing, listing2 : LeaseListing) : Order.Order {
      Nat.compare(listing1.listingId, listing2.listingId);
    };
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User profile management functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Lease listing management functions
  public shared ({ caller }) func createLeaseListing(nickname : Text, leaseCode : Text, splitRatio : Text) : async ListingID {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admin can create listings");
    };

    let listingId = nextListingId;
    let newListing : LeaseListing = {
      listingId;
      nickname;
      leaseCode;
      splitRatio;
      availability = true;
    };

    leaseListings.add(listingId, newListing);
    nextListingId += 1;
    listingId;
  };

  public shared ({ caller }) func updateLeaseListing(listingId : ListingID, nickname : Text, leaseCode : Text, splitRatio : Text, availability : Bool) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admin can update listings");
    };

    let existingListing = switch (leaseListings.get(listingId)) {
      case (null) { Runtime.trap("Listing not found") };
      case (?listing) { listing };
    };

    let updatedListing : LeaseListing = {
      listingId = existingListing.listingId;
      nickname;
      leaseCode;
      splitRatio;
      availability;
    };

    leaseListings.add(listingId, updatedListing);
  };

  public shared ({ caller }) func deleteLeaseListing(listingId : ListingID) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admin can delete listings");
    };

    if (not leaseListings.containsKey(listingId)) {
      Runtime.trap("Listing not found");
    };

    leaseListings.remove(listingId);
  };

  public query ({ caller }) func getAllLeaseListings() : async [LeaseListing] {
    leaseListings.values().toArray().sort();
  };

  public query ({ caller }) func verifyIsAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  public query ({ caller }) func getListingId(leaseCode : Text) : async ?ListingID {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can query lease codes");
    };
    for ((id, listing) in leaseListings.entries()) {
      if (listing.leaseCode == leaseCode) {
        return ?id;
      };
    };
    null;
  };
};
