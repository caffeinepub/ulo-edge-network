import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { LeaseListing, ListingID, UserProfile } from '../backend';

export function useGetAllLeaseListings() {
  const { actor, isFetching } = useActor();

  return useQuery<LeaseListing[]>({
    queryKey: ['leaseListings'],
    queryFn: async () => {
      if (!actor) {
        throw new Error('Actor not available');
      }
      const listings = await actor.getAllLeaseListings();
      return listings;
    },
    enabled: !!actor && !isFetching,
    staleTime: 30000, // Cache for 30 seconds
    refetchInterval: 60000, // Auto-refresh every 60 seconds
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  const { identity, isInitializing } = useInternetIdentity();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) {
        throw new Error('Actor not available');
      }
      if (!identity) {
        return false;
      }
      try {
        const result = await actor.isCallerAdmin();
        return result;
      } catch (error) {
        console.error('Error checking admin status:', error);
        throw error;
      }
    },
    enabled: !!actor && !!identity && !isFetching && !isInitializing,
    retry: 2,
    retryDelay: 1000,
    staleTime: 5000,
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching } = useActor();
  const { identity, isInitializing } = useInternetIdentity();

  return useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !!identity && !isFetching && !isInitializing,
    retry: false,
  });
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useCreateLeaseListing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      nickname,
      leaseCode,
      splitRatio,
    }: {
      nickname: string;
      leaseCode: string;
      splitRatio: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createLeaseListing(nickname, leaseCode, splitRatio);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaseListings'] });
    },
  });
}

export function useUpdateLeaseListing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      listingId,
      nickname,
      leaseCode,
      splitRatio,
      availability,
    }: {
      listingId: ListingID;
      nickname: string;
      leaseCode: string;
      splitRatio: string;
      availability: boolean;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateLeaseListing(listingId, nickname, leaseCode, splitRatio, availability);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaseListings'] });
    },
  });
}

export function useDeleteLeaseListing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (listingId: ListingID) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteLeaseListing(listingId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaseListings'] });
    },
  });
}
