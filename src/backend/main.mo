import MixinStorage "blob-storage/Mixin";
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
  include MixinStorage();

  // Lease Listing Management
  public query ({ caller }) func getAllLeaseListings() : async [LeaseListing] {
    leaseListings.values().toArray().sort();
  };

  // Add other necessary functions as needed
};
