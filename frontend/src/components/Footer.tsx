import { SiX } from 'react-icons/si';
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' ? window.location.hostname : 'unity-lease-hub';

  return (
    <footer className="border-t border-border/40 bg-muted/30 mt-24">
      <div className="container px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          {/* Branding */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img
                src="/assets/generated/unity-logo.dim_200x200.png"
                alt="Unity Nodes"
                className="h-10 w-10 rounded-md flex-shrink-0"
              />
              <h3 className="font-semibold text-lg">ULO Mobile Edge Network</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting Unity Node Operators with License Operators for seamless mobile earning opportunities on the
              decentralized network.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#leases" className="hover:text-foreground transition-colors">
                  Available Leases
                </a>
              </li>
              <li>
                <a href="#setup" className="hover:text-foreground transition-colors">
                  Setup Guide
                </a>
              </li>
              <li>
                <a href="#tutorials" className="hover:text-foreground transition-colors">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#glossary" className="hover:text-foreground transition-colors">
                  Glossary
                </a>
              </li>
            </ul>
          </div>

          {/* Connect — X only, no Facebook/LinkedIn/Instagram */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Connect</h3>
            <a
              href="https://x.com/UnityNodesIO"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-muted group-hover:bg-foreground/10 transition-colors">
                <SiX className="h-4 w-4" />
              </span>
              <span>Follow on X</span>
            </a>
            <div className="mt-4 space-y-2">
              <a
                href="https://apps.apple.com/us/app/unity-network-app/id6755482738"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src="/assets/generated/appstore-badge.dim_240x80.png"
                  alt="Download on the App Store"
                  className="h-9 w-auto"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=io.unitynodes.unityapp"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src="/assets/generated/googleplay-badge.dim_240x80.png"
                  alt="Get it on Google Play"
                  className="h-9 w-auto"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} ULO Mobile Edge Network. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="h-4 w-4 text-red-500 fill-red-500 mx-0.5" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(appIdentifier)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors font-medium ml-1"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
