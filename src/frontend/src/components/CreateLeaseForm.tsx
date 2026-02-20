import { useState } from 'react';
import { useCreateLeaseListing } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function CreateLeaseForm() {
  const [nickname, setNickname] = useState('');
  const [leaseCode, setLeaseCode] = useState('');
  const [splitRatio, setSplitRatio] = useState('');
  const createMutation = useCreateLeaseListing();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nickname.trim() || !leaseCode.trim() || !splitRatio.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    // Basic UUID format validation
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(leaseCode.trim())) {
      toast.error('Please enter a valid UUID format lease code');
      return;
    }

    // Basic split ratio validation
    const splitRegex = /^\d+\/\d+$/;
    if (!splitRegex.test(splitRatio.trim())) {
      toast.error('Please enter split ratio in format like "60/40"');
      return;
    }

    try {
      await createMutation.mutateAsync({
        nickname: nickname.trim(),
        leaseCode: leaseCode.trim(),
        splitRatio: splitRatio.trim(),
      });
      toast.success('Lease listing created successfully!');
      setNickname('');
      setLeaseCode('');
      setSplitRatio('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create listing');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create New Lease Listing
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nickname">Nickname *</Label>
            <Input
              id="nickname"
              type="text"
              placeholder="e.g., Premium 60/40 Lease, Batch A-1, Florida High-Uptime"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              disabled={createMutation.isPending}
            />
            <p className="text-xs text-muted-foreground">
              A short, human-readable label for internal use only (not visible to public)
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="leaseCode">Lease Code (UUID Format) *</Label>
            <Input
              id="leaseCode"
              type="text"
              placeholder="e.g., 2793ff69-b468-4342-b3cd-3956a4822003"
              value={leaseCode}
              onChange={(e) => setLeaseCode(e.target.value)}
              disabled={createMutation.isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="splitRatio">Split Ratio *</Label>
            <Input
              id="splitRatio"
              type="text"
              placeholder="e.g., 60/40"
              value={splitRatio}
              onChange={(e) => setSplitRatio(e.target.value)}
              disabled={createMutation.isPending}
            />
          </div>
          <Button type="submit" disabled={createMutation.isPending} className="w-full sm:w-auto gap-2">
            {createMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Create Listing
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
