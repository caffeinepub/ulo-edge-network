import { useState } from 'react';
import { useGetAllLeaseListings } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

function formatPartialCode(fullCode: string): string {
  const parts = fullCode.split('-');
  if (parts.length < 2) return fullCode.substring(0, 4) + '...';
  const firstFour = fullCode.substring(0, 4);
  const lastPart = parts[parts.length - 1];
  const lastFour = lastPart.substring(0, 4);
  return `${firstFour}...${lastFour}`;
}

export default function LeaseListings() {
  // NOTE: This component is for PUBLIC display only.
  // The 'nickname' field from LeaseListing must NEVER be displayed here.
  // Only show: partial lease code, split ratio, availability status, and copy button.
  const { data: listings, isLoading, error } = useGetAllLeaseListings();
  const [copiedId, setCopiedId] = useState<bigint | null>(null);

  const handleCopy = async (leaseCode: string, listingId: bigint) => {
    try {
      await navigator.clipboard.writeText(leaseCode);
      setCopiedId(listingId);
      toast.success('Lease code copied to clipboard!');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast.error('Failed to copy code. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <AlertCircle className="h-5 w-5" />
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => {
        const isCopied = copiedId === listing.listingId;
        const isAvailable = listing.availability;

        return (
          <Card key={listing.listingId.toString()} className={!isAvailable ? 'opacity-75' : ''}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Lease #{listing.listingId.toString()}</CardTitle>
                <Badge 
                  variant={isAvailable ? 'default' : 'secondary'}
                  className={isAvailable ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
                >
                  {isAvailable ? 'Available' : 'Unavailable'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Lease Code</p>
                <p className="font-mono text-sm bg-muted px-3 py-2 rounded">
                  {formatPartialCode(listing.leaseCode)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Split Ratio</p>
                <p className="font-semibold text-lg">{listing.splitRatio}</p>
              </div>
              {!isAvailable && (
                <p className="text-sm text-destructive flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  This code is already in use. Please try another.
                </p>
              )}
              <Button
                onClick={() => handleCopy(listing.leaseCode, listing.listingId)}
                disabled={!isAvailable}
                className="w-full gap-2"
                variant={isAvailable ? 'default' : 'secondary'}
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
  );
}
