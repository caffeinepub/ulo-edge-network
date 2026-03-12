import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { AlertCircle, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { LeaseListing, ListingID } from "../backend";
import {
  useDeleteLeaseListing,
  useGetAllLeaseListings,
} from "../hooks/useQueries";
import LeaseListingModal from "./LeaseListingModal";

export default function AdminLeaseListTable() {
  const { data: listings, isLoading, error } = useGetAllLeaseListings();
  const deleteMutation = useDeleteLeaseListing();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<LeaseListing | null>(
    null,
  );

  function handleCreate() {
    setEditingListing(null);
    setModalOpen(true);
  }

  function handleEdit(listing: LeaseListing) {
    setEditingListing(listing);
    setModalOpen(true);
  }

  async function handleDelete(listingId: ListingID) {
    if (!confirm("Delete this lease listing?")) return;
    try {
      await deleteMutation.mutateAsync(listingId);
      toast.success("Lease listing deleted.");
    } catch {
      toast.error("Failed to delete listing.");
    }
  }

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
          <div
            className="flex items-center gap-2 text-destructive"
            data-ocid="admin.lease_list.error_state"
          >
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p>Failed to load lease listings. Please try again later.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Lease Listings</CardTitle>
          <Button
            onClick={handleCreate}
            data-ocid="admin.create_lease.open_modal_button"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Lease
          </Button>
        </CardHeader>
        <CardContent>
          {!listings || listings.length === 0 ? (
            <p
              className="text-center text-muted-foreground py-8"
              data-ocid="admin.lease_list.empty_state"
            >
              No listings yet. Click "Create New Lease" to add one.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table data-ocid="admin.lease_list.table">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">ID</TableHead>
                    <TableHead className="min-w-[140px]">Nickname</TableHead>
                    <TableHead className="min-w-[280px]">Lease Code</TableHead>
                    <TableHead className="w-28">Split</TableHead>
                    <TableHead className="w-28">Status</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listings.map((listing, idx) => (
                    <TableRow
                      key={listing.listingId.toString()}
                      data-ocid={`admin.lease_list.item.${idx + 1}`}
                    >
                      <TableCell className="font-medium">
                        {listing.listingId.toString()}
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">
                          {listing.nickname || "(No nickname)"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-xs break-all">
                          {listing.leaseCode}
                        </span>
                      </TableCell>
                      <TableCell>{listing.splitRatio}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            listing.availability
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : "bg-red-600 hover:bg-red-700 text-white"
                          }
                        >
                          {listing.availability ? "Available" : "Unavailable"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleEdit(listing)}
                            data-ocid={`admin.lease_list.edit_button.${idx + 1}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(listing.listingId)}
                            data-ocid={`admin.lease_list.delete_button.${idx + 1}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <LeaseListingModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        listing={editingListing}
      />
    </>
  );
}
