import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const terms = [
  {
    id: "uno",
    term: "UNO",
    definition:
      "Unity Node Operator - An individual or entity that operates Unity nodes and offers lease codes to ULOs.",
  },
  {
    id: "ulo",
    term: "ULO",
    definition:
      "Unity License Operator - A user who leases a code from a UNO to participate in the Unity network and earn rewards using their mobile device.",
  },
  {
    id: "lease-code",
    term: "Lease Code",
    definition:
      "A unique identifier (UUID format) that grants access to the Unity network. Each code is single-use and must be entered in the Unity mobile app.",
  },
  {
    id: "split-ratio",
    term: "Split Ratio",
    definition:
      "The percentage distribution of rewards between the UNO and ULO (e.g., 60/40 means 60% to UNO, 40% to ULO).",
  },
  {
    id: "unity-network",
    term: "Unity Network",
    definition:
      "A decentralized network that leverages mobile devices to contribute computing resources in exchange for rewards.",
  },
  {
    id: "availability",
    term: "Availability Status",
    definition:
      "Indicates whether a lease code is available for use or has already been claimed by another user.",
  },
];

export default function GlossarySection() {
  return (
    <section id="glossary" className="py-16 sm:py-20">
      <div className="container px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Glossary
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Key terms and definitions for the Unity ecosystem.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {terms.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="text-lg">{item.term}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.definition}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
