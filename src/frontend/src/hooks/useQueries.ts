import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { LeaseListing, ListingID, UserRole } from "../backend";
import { useActor } from "./useActor";
import { useInternetIdentity } from "./useInternetIdentity";

export function useGetAllLeaseListings() {
  const { actor, isFetching } = useActor();

  return useQuery<LeaseListing[]>({
    queryKey: ["leaseListings"],
    queryFn: async () => {
      if (!actor) return [];
      const listings = await actor.getAllLeaseListings();
      return listings;
    },
    enabled: !!actor && !isFetching,
    staleTime: 30000,
    refetchInterval: 60000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  const { identity, isInitializing } = useInternetIdentity();

  return useQuery<boolean>({
    queryKey: ["isCallerAdmin", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) {
        throw new Error("Actor not available");
      }
      if (!identity) {
        return false;
      }
      try {
        const result = await actor.isCallerAdmin();
        return result;
      } catch (error) {
        console.error("Error checking admin status:", error);
        throw error;
      }
    },
    enabled: !!actor && !!identity && !isFetching && !isInitializing,
    retry: 2,
    retryDelay: 1000,
    staleTime: 5000,
  });
}

export function useGetCallerUserRole() {
  const { actor, isFetching } = useActor();
  const { identity, isInitializing } = useInternetIdentity();

  return useQuery<UserRole | null>({
    queryKey: ["callerUserRole", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !!identity && !isFetching && !isInitializing,
    retry: false,
  });
}

export function useAssignCallerUserRole() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      user,
      role,
    }: { user: import("@dfinity/principal").Principal; role: UserRole }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.assignCallerUserRole(user, role);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerUserRole"] });
      queryClient.invalidateQueries({ queryKey: ["isCallerAdmin"] });
    },
  });
}
