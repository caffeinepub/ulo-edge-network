import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsCallerAdmin } from "../hooks/useQueries";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { identity, isInitializing } = useInternetIdentity();
  const {
    data: isAdmin,
    isLoading: isCheckingAdmin,
    isFetched,
    error,
  } = useIsCallerAdmin();
  const [hasShownError, setHasShownError] = useState(false);

  useEffect(() => {
    // Wait for identity initialization to complete
    if (isInitializing) {
      return;
    }

    // Check if user is not logged in
    if (!identity) {
      if (!hasShownError) {
        toast.error("Please log in to access the admin dashboard");
        setHasShownError(true);
      }
      navigate({ to: "/" });
      return;
    }

    // Wait for admin check to complete before making decisions
    if (!isFetched || isCheckingAdmin) {
      return;
    }

    // Handle errors from admin check
    if (error) {
      console.error("Admin check error:", error);
      if (!hasShownError) {
        toast.error("Error verifying admin access");
        setHasShownError(true);
      }
      navigate({ to: "/" });
      return;
    }

    // Check admin status only after query has completed
    if (isAdmin === false) {
      if (!hasShownError) {
        toast.error("Admin access is restricted");
        setHasShownError(true);
      }
      navigate({ to: "/" });
      return;
    }
  }, [
    identity,
    isAdmin,
    isCheckingAdmin,
    isInitializing,
    isFetched,
    error,
    navigate,
    hasShownError,
  ]);

  // Show loading state while initializing or checking
  if (isInitializing || !isFetched || isCheckingAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Only render children if authenticated and admin check passed
  if (identity && isAdmin === true) {
    return <>{children}</>;
  }

  // Fallback loading state (should not reach here due to useEffect redirects)
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        <p className="text-muted-foreground">Verifying access...</p>
      </div>
    </div>
  );
}
