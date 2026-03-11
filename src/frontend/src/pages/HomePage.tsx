import { Toaster } from "@/components/ui/sonner";
import AppDownloadButtons from "../components/AppDownloadButtons";
import FAQSection from "../components/FAQSection";
import GlossarySection from "../components/GlossarySection";
import LeaseListings from "../components/LeaseListings";
import RequirementsSection from "../components/RequirementsSection";
import RewardsSection from "../components/RewardsSection";
import SetupGuideSection from "../components/SetupGuideSection";
import TasksSection from "../components/TasksSection";
import TutorialsSection from "../components/TutorialsSection";

export default function HomePage() {
  return (
    <>
      <Toaster position="top-center" />

      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full" style={{ minHeight: "220px" }}>
          <img
            src="/assets/generated/hero-banner.dim_1440x480.png"
            alt="ULO Mobile Edge Network — global decentralized network"
            className="w-full object-cover object-center"
            style={{ maxHeight: "420px", minHeight: "180px" }}
          />
          {/* Text content overlay */}
          <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-20">
            <div className="max-w-xl">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-3 text-white drop-shadow-lg">
                ULO Mobile Edge Network
              </h1>
              <p className="text-sm sm:text-base lg:text-lg max-w-md text-white/90 drop-shadow">
                Lease codes by <strong className="text-white">A304</strong> —
                turn your smartphone into a revenue-generating edge node.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-8 sm:py-10 bg-primary/5 border-b border-border/40">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold">
                Get the Unity Network App
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Available on iOS and Android — free to download.
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
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Available Lease Codes
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
                Browse our current selection of lease codes. Each code includes
                a split ratio showing how rewards are distributed between the
                UNO and ULO. Codes are single-use — copy and enter in the Unity
                app to activate.
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
