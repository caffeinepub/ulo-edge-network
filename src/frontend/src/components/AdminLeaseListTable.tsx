import { useState } from 'react';
import { useGetAllLeaseListings, useUpdateLeaseListing, useDeleteLeaseListing } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Loader2, Save, Edit2, X, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { LeaseListing } from '../backend';

export default function AdminLeaseListTable() {
  const { data: listings, isLoading } = useGetAllLeaseListings();
  const updateMutation = useUpdateLeaseListing();
  const deleteMutation = useDeleteLeaseListing();
  const [editingId, setEditingId] = useState<bigint | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState<bigint | null>(null);
  const [editForm, setEditForm] = useState<{
    nickname: string;
    leaseCode: string;
    splitRatio: string;
    availability: boolean;
  }>({
    nickname: '',
    leaseCode: '',
    splitRatio: '',
    availability: true,
  });

  const startEdit = (listing: LeaseListing) => {
    setEditingId(listing.listingId);
    setEditForm({
      nickname: listing.nickname,
      leaseCode: listing.leaseCode,
      splitRatio: listing.splitRatio,
      availability: listing.availability,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ nickname: '', leaseCode: '', splitRatio: '', availability: true });
  };

  const handleUpdate = async (listingId: bigint) => {
    if (!editForm.nickname.trim() || !editForm.leaseCode.trim() || !editForm.splitRatio.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await updateMutation.mutateAsync({
        listingId,
        nickname: editForm.nickname.trim(),
        leaseCode: editForm.leaseCode.trim(),
        splitRatio: editForm.splitRatio.trim(),
        availability: editForm.availability,
      });
      toast.success('Listing updated successfully!');
      setEditingId(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update listing');
    }
  };

  const confirmDelete = (listingId: bigint) => {
    setListingToDelete(listingId);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!listingToDelete) return;

    try {
      await deleteMutation.mutateAsync(listingToDelete);
      toast.success('Listing deleted successfully!');
      setDeleteDialogOpen(false);
      setListingToDelete(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete listing');
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Manage Lease Listings</CardTitle>
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

  if (!listings || listings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Manage Lease Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">No listings yet. Create your first one above!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Manage Lease Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[180px]">Nickname</TableHead>
                  <TableHead className="w-20">ID</TableHead>
                  <TableHead className="min-w-[320px]">Lease Code</TableHead>
                  <TableHead className="w-32">Split Ratio</TableHead>
                  <TableHead className="w-32">Available</TableHead>
                  <TableHead className="w-40 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listings.map((listing) => {
                  const isEditing = editingId === listing.listingId;

                  return (
                    <TableRow key={listing.listingId.toString()}>
                      <TableCell>
                        {isEditing ? (
                          <Input
                            value={editForm.nickname}
                            onChange={(e) => setEditForm({ ...editForm, nickname: e.target.value })}
                            placeholder="e.g., Premium 60/40"
                          />
                        ) : (
                          <span className="font-medium">{listing.nickname || '(No nickname)'}</span>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{listing.listingId.toString()}</TableCell>
                      <TableCell>
                        {isEditing ? (
                          <Input
                            value={editForm.leaseCode}
                            onChange={(e) => setEditForm({ ...editForm, leaseCode: e.target.value })}
                            className="font-mono text-sm"
                          />
                        ) : (
                          <span className="font-mono text-sm break-all">{listing.leaseCode}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {isEditing ? (
                          <Input
                            value={editForm.splitRatio}
                            onChange={(e) => setEditForm({ ...editForm, splitRatio: e.target.value })}
                          />
                        ) : (
                          listing.splitRatio
                        )}
                      </TableCell>
                      <TableCell>
                        {isEditing ? (
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={editForm.availability}
                              onCheckedChange={(checked) => setEditForm({ ...editForm, availability: checked })}
                            />
                            <Label className="text-sm">{editForm.availability ? 'Yes' : 'No'}</Label>
                          </div>
                        ) : (
                          <span className={listing.availability ? 'text-green-600' : 'text-muted-foreground'}>
                            {listing.availability ? 'Yes' : 'No'}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {isEditing ? (
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleUpdate(listing.listingId)}
                              disabled={updateMutation.isPending}
                              className="gap-1"
                            >
                              {updateMutation.isPending ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <Save className="h-3 w-3" />
                              )}
                            </Button>
                            <Button size="sm" variant="outline" onClick={cancelEdit} disabled={updateMutation.isPending}>
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline" onClick={() => startEdit(listing)} className="gap-1">
                              <Edit2 className="h-3 w-3" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => confirmDelete(listing.listingId)}
                              className="gap-1"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the lease listing from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
