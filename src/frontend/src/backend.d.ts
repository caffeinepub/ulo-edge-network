import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ListingID = bigint;
export interface LeaseListing {
    nickname: string;
    listingId: ListingID;
    availability: boolean;
    leaseCode: string;
    splitRatio: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllLeaseListings(): Promise<Array<LeaseListing>>;
    getCallerUserRole(): Promise<UserRole>;
    isCallerAdmin(): Promise<boolean>;
    addLeaseListing(nickname: string, leaseCode: string, splitRatio: string, availability: boolean): Promise<LeaseListing>;
    updateLeaseListing(listingId: ListingID, nickname: string, leaseCode: string, splitRatio: string, availability: boolean): Promise<LeaseListing | null>;
    deleteLeaseListing(listingId: ListingID): Promise<boolean>;
}
