import { useNavigate } from '@tanstack/react-router';
import AdminOnlyButton from './AdminOnlyButton';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 sm:gap-4 cursor-pointer" onClick={() => navigate({ to: '/' })}>
          <img
            src="/assets/generated/unity-logo.dim_400x400.png"
            alt="Unity Nodes"
            className="h-10 w-10 sm:h-12 sm:w-12"
          />
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight">Unity Lease Hub</h1>
        </div>
        <AdminOnlyButton />
      </div>
    </header>
  );
}
