import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Shield, LogOut, Loader2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function AdminOnlyButton() {
  const navigate = useNavigate();
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: isCheckingAdmin, isFetched } = useIsCallerAdmin();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  // Auto-navigate to dashboard after successful admin verification
  useEffect(() => {
    if (isAuthenticated && isFetched && isAdmin === true && !isCheckingAdmin) {
      // Check if we're not already on the admin page
      if (window.location.pathname !== '/admin') {
        navigate({ to: '/admin' });
      }
    }
  }, [isAuthenticated, isFetched, isAdmin, isCheckingAdmin, navigate]);

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
      navigate({ to: '/' });
    } else {
      try {
        await login();
        // Navigation will happen automatically via useEffect after admin check
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const buttonText = isAuthenticated ? 'Logout' : 'Admin Login';

  const buttonIcon = isAuthenticated ? (
    <LogOut className="h-4 w-4" />
  ) : (
    <Shield className="h-4 w-4" />
  );

  return (
    <div className="flex items-center gap-2">
      {isAuthenticated && isCheckingAdmin && (
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      )}
      {isAuthenticated && !isCheckingAdmin && isAdmin && (
        <Button
          onClick={() => navigate({ to: '/admin' })}
          variant="default"
          size="sm"
          className="gap-2"
        >
          <Shield className="h-4 w-4" />
          <span className="hidden sm:inline">Dashboard</span>
        </Button>
      )}
      <Button
        onClick={handleAuth}
        disabled={isLoggingIn}
        variant={isAuthenticated ? 'outline' : 'default'}
        size="sm"
        className="gap-2"
      >
        {isLoggingIn ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="hidden sm:inline">Logging in...</span>
          </>
        ) : (
          <>
            {buttonIcon}
            <span className="hidden sm:inline">{buttonText}</span>
            <span className="sm:hidden">{isAuthenticated ? 'Out' : 'Admin'}</span>
          </>
        )}
      </Button>
    </div>
  );
}
