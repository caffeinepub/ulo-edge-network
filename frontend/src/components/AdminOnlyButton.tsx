import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Shield, LogOut, Loader2, Lock } from 'lucide-react';
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
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

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
          className="gap-1.5"
        >
          <Shield className="h-4 w-4" />
          <span className="hidden sm:inline">Dashboard</span>
        </Button>
      )}
      {!isAuthenticated ? (
        <Button
          onClick={handleAuth}
          disabled={isLoggingIn}
          variant="outline"
          size="sm"
          className="gap-1.5 border-primary/40 hover:border-primary hover:bg-primary/10"
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="hidden sm:inline text-xs">Logging in…</span>
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" />
              <span className="text-xs font-semibold">Admin Only</span>
            </>
          )}
        </Button>
      ) : (
        <Button
          onClick={handleAuth}
          variant="ghost"
          size="sm"
          className="gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline text-xs">Logout</span>
        </Button>
      )}
    </div>
  );
}
