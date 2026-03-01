import { useNavigate } from '@tanstack/react-router';
import AdminOnlyButton from './AdminOnlyButton';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer min-w-0"
          onClick={() => navigate({ to: '/' })}
        >
          <img
            src="/assets/generated/unity-logo.dim_200x200.png"
            alt="Unity Nodes"
            className="h-9 w-9 sm:h-11 sm:w-11 flex-shrink-0 rounded-md"
          />
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg lg:text-xl font-bold tracking-tight leading-tight truncate">
              ULO Mobile Edge Network
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Lease Codes by A304</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          <AdminOnlyButton />
        </div>
      </div>
    </header>
  );
}
