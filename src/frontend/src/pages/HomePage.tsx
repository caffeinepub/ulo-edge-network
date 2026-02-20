import LeaseListings from '../components/LeaseListings';
import AppDownloadButtons from '../components/AppDownloadButtons';
import TutorialsSection from '../components/TutorialsSection';
import SetupGuideSection from '../components/SetupGuideSection';
import RequirementsSection from '../components/RequirementsSection';
import TasksSection from '../components/TasksSection';
import RewardsSection from '../components/RewardsSection';
import FAQSection from '../components/FAQSection';
import GlossarySection from '../components/GlossarySection';
import { Toaster } from '@/components/ui/sonner';

export default function HomePage() {
  return (
    <>
      <Toaster position="top-center" />
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: 'url(/assets/generated/hero-banner.dim_1920x600.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Available ULO Leases from <span className="text-primary">A304</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Access exclusive lease codes to start earning with the Unity Network. Join the decentralized mobile
              computing revolution and turn your smartphone into a revenue-generating asset.
            </p>
            <div className="bg-muted/50 border border-border rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-sm sm:text-base font-medium">
                ⚠️ <strong>Important:</strong> Lease codes are for single use in the Unity app. Enter the code there to
                start earning with your mobile device.
              </p>
            </div>
            <AppDownloadButtons />
          </div>
        </div>
      </section>

      {/* Lease Listings Section */}
      <section id="leases" className="py-16 sm:py-20 bg-muted/30">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Available Lease Codes</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Browse our current selection of lease codes. Each code includes a split ratio showing how rewards are
                distributed between the UNO and ULO.
              </p>
            </div>
            <LeaseListings />
          </div>
        </div>
      </section>

      {/* Setup Guide */}
      <SetupGuideSection />

      {/* Requirements */}
      <RequirementsSection />

      {/* Tasks */}
      <TasksSection />

      {/* Rewards */}
      <RewardsSection />

      {/* Tutorials */}
      <TutorialsSection />

      {/* FAQ */}
      <FAQSection />

      {/* Glossary */}
      <GlossarySection />
    </>
  );
}
