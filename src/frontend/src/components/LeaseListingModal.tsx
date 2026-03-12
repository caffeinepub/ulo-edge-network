import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { LeaseListing } from "../backend";
import { useAddLeaseListing, useUpdateLeaseListing } from "../hooks/useQueries";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listing: LeaseListing | null;
}

export default function LeaseListingModal({
  open,
  onOpenChange,
  listing,
}: Props) {
  const addMutation = useAddLeaseListing();
  const updateMutation = useUpdateLeaseListing();

  const [nickname, setNickname] = useState("");
  const [leaseCode, setLeaseCode] = useState("");
  const [splitRatio, setSplitRatio] = useState("60/40");
  const [availability, setAvailability] = useState("true");

  const isEditing = listing !== null;

  // Reset form when the dialog opens or the listing changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional reset on open
  useEffect(() => {
    if (listing) {
      setNickname(listing.nickname);
      setLeaseCode(listing.leaseCode);
      setSplitRatio(listing.splitRatio);
      setAvailability(listing.availability ? "true" : "false");
    } else {
      setNickname("");
      setLeaseCode("");
      setSplitRatio("60/40");
      setAvailability("true");
    }
  }, [listing, open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!leaseCode.trim()) {
      toast.error("Lease Code is required.");
      return;
    }

    try {
      if (isEditing && listing) {
        await updateMutation.mutateAsync({
          listingId: listing.listingId,
          nickname: nickname.trim(),
          leaseCode: leaseCode.trim(),
          splitRatio: splitRatio.trim(),
          availability: availability === "true",
        });
        toast.success("Lease listing updated successfully.");
      } else {
        await addMutation.mutateAsync({
          nickname: nickname.trim(),
          leaseCode: leaseCode.trim(),
          splitRatio: splitRatio.trim(),
          availability: availability === "true",
        });
        toast.success("Lease listing created successfully.");
      }
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save — check connection or try again.");
    }
  }

  const isPending = addMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-lg"
        data-ocid="admin.lease_form.dialog"
      >
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Lease Listing" : "Create New Lease Listing"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nickname">Nickname (admin only)</Label>
            <Input
              id="nickname"
              placeholder="e.g. Premium 60/40 Lease"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              data-ocid="admin.lease_form.nickname.input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="leaseCode">Lease Code *</Label>
            <Input
              id="leaseCode"
              placeholder="e.g. 2793ff69-b468-4342-b3cd-3956a4822003"
              value={leaseCode}
              onChange={(e) => setLeaseCode(e.target.value)}
              required
              data-ocid="admin.lease_form.lease_code.input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="splitRatio">Split Ratio</Label>
            <Input
              id="splitRatio"
              placeholder="e.g. 60/40"
              value={splitRatio}
              onChange={(e) => setSplitRatio(e.target.value)}
              data-ocid="admin.lease_form.split_ratio.input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="availability">Availability</Label>
            <Select value={availability} onValueChange={setAvailability}>
              <SelectTrigger
                id="availability"
                data-ocid="admin.lease_form.availability.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Available</SelectItem>
                <SelectItem value="false">Unavailable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              data-ocid="admin.lease_form.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              data-ocid="admin.lease_form.submit_button"
            >
              {isPending
                ? "Saving..."
                : isEditing
                  ? "Save Changes"
                  : "Create Listing"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
