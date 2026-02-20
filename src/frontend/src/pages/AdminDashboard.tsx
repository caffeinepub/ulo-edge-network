import ProtectedRoute from '../components/ProtectedRoute';
import CreateLeaseForm from '../components/CreateLeaseForm';
import AdminLeaseListTable from '../components/AdminLeaseListTable';
import { Toaster } from '@/components/ui/sonner';
import { Shield } from 'lucide-react';

function AdminDashboardContent() {
  return (
    <>
      <Toaster position="top-center" />
      <div className="container px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage your lease listings and availability status</p>
            </div>
          </div>

          <CreateLeaseForm />
          <AdminLeaseListTable />
        </div>
      </div>
    </>
  );
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
