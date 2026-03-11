import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Check, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useGetAllLeaseListings } from "../hooks/useQueries";

function formatPartialCode(fullCode: string): string {
  const parts = fullCode.split("-");
  if (parts.length < 2) return `${fullCode.substring(0, 4)}...`;
  const firstFour = fullCode.substring(0, 4);
  const lastPart = parts[parts.length - 1];
  const lastFour = lastPart.substring(0, 4);
  return `${firstFour}...${lastFour}`;
}

export default function LeaseListings() {
  const {
    data: listings,
    isLoading,
    error,
    isFetching,
    dataUpdatedAt,
  } = useGetAllLeaseListings();
  const [copiedId, setCopiedId] = useState<bigint | null>(null);

  const handleCopy = async (leaseCode: string, listingId: bigint) => {
    try {
      await navigator.clipboard.writeText(leaseCode);
      setCopiedId(listingId);
      toast.success("Lease code copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (_err) {
      toast.error("Failed to copy code. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p>Failed to load lease listings. Please try again later.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!listings || listings.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 pb-6">
          <p className="text-center text-muted-foreground text-lg">
            No leases available yet — check back soon!
          </p>
        </CardContent>
      </Card>
    );
  }

  const lastUpdated = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString()
    : null;

  return (
    <div>
      <div className="flex items-center justify-end gap-2 mb-4 text-xs text-muted-foreground">
        <RefreshCw className={`h-3 w-3 ${isFetching ? "animate-spin" : ""}`} />
        <span>
          {isFetching
            ? "Refreshing…"
            : lastUpdated
              ? `Updated ${lastUpdated}`
              : "Live"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {listings.map((listing) => {
          const isCopied = copiedId === listing.listingId;
          const isAvailable = listing.availability;

          return (
            <Card
              key={listing.listingId.toString()}
              className={!isAvailable ? "opacity-75" : ""}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-base sm:text-lg">
                    Lease #{listing.listingId.toString()}
                  </CardTitle>
                  <Badge
                    variant={isAvailable ? "default" : "secondary"}
                    className={`text-xs flex-shrink-0 ${isAvailable ? "bg-green-600 hover:bg-green-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"}`}
                  >
                    {isAvailable ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                    Lease Code
                  </p>
                  <p className="font-mono text-sm bg-muted px-3 py-2 rounded break-all">
                    {formatPartialCode(listing.leaseCode)}
                  </p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                    Split Ratio
                  </p>
                  <p className="font-semibold text-base sm:text-lg">
                    {listing.splitRatio}
                  </p>
                </div>
                {!isAvailable && (
                  <p className="text-xs sm:text-sm text-destructive flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    This code is already in use. Please try another.
                  </p>
                )}
                <Button
                  onClick={() =>
                    handleCopy(listing.leaseCode, listing.listingId)
                  }
                  disabled={!isAvailable}
                  className="w-full gap-2 min-h-[44px]"
                  variant={isAvailable ? "default" : "secondary"}
                >
                  {isCopied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy Code
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
