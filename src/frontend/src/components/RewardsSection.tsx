import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, PieChart } from 'lucide-react';

export default function RewardsSection() {
  return (
    <section id="rewards" className="py-16 sm:py-20">
      <div className="container px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Rewards</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Understand how earnings are split between UNOs and ULOs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardContent className="pt-8 pb-8">
              <div className="flex items-start gap-4">
                <img
                  src="/assets/generated/rewards-icon.dim_256x256.png"
                  alt="Rewards"
                  className="h-16 w-16 flex-shrink-0"
                />
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    General Structure
                  </h3>
                  <p className="text-muted-foreground">
                    Unity License Operators (ULOs) typically receive 75% of the rewards generated through the network,
                    providing a strong incentive for participation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-8 pb-8">
              <div className="flex items-start gap-4">
                <PieChart className="h-16 w-16 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Customized Lease Splits</h3>
                  <p className="text-muted-foreground">
                    The specific split ratios shown on this site (e.g., 60/40) apply to individual lease agreements.
                    These customized splits determine how rewards are shared between the UNO and ULO.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
