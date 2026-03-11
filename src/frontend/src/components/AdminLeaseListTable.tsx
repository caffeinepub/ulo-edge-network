import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCircle } from "lucide-react";
import { useGetAllLeaseListings } from "../hooks/useQueries";

export default function AdminLeaseListTable() {
  const { data: listings, isLoading, error } = useGetAllLeaseListings();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Lease Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
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
        <CardHeader>
          <CardTitle>Lease Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            No listings available yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lease Listings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">ID</TableHead>
                <TableHead className="min-w-[180px]">Nickname</TableHead>
                <TableHead className="min-w-[320px]">Lease Code</TableHead>
                <TableHead className="w-32">Split Ratio</TableHead>
                <TableHead className="w-32">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.map((listing) => (
                <TableRow key={listing.listingId.toString()}>
                  <TableCell className="font-medium">
                    {listing.listingId.toString()}
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">
                      {listing.nickname || "(No nickname)"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-sm break-all">
                      {listing.leaseCode}
                    </span>
                  </TableCell>
                  <TableCell>{listing.splitRatio}</TableCell>
                  <TableCell>
                    <Badge
                      variant={listing.availability ? "default" : "secondary"}
                      className={
                        listing.availability
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-red-600 hover:bg-red-700 text-white"
                      }
                    >
                      {listing.availability ? "Available" : "Unavailable"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
