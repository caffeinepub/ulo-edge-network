import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface LeaseListing {
    nickname: string;
    listingId: ListingID;
    availability: boolean;
    leaseCode: string;
    splitRatio: string;
}
export interface UserProfile {
    name: string;
}
export type ListingID = bigint;
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createLeaseListing(nickname: string, leaseCode: string, splitRatio: string): Promise<ListingID>;
    deleteLeaseListing(listingId: ListingID): Promise<void>;
    getAllLeaseListings(): Promise<Array<LeaseListing>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getListingId(leaseCode: string): Promise<ListingID | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateLeaseListing(listingId: ListingID, nickname: string, leaseCode: string, splitRatio: string, availability: boolean): Promise<void>;
    verifyIsAdmin(): Promise<boolean>;
}
