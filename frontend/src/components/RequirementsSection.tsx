import { Card, CardContent } from '@/components/ui/card';
import { Smartphone, Wifi } from 'lucide-react';

export default function RequirementsSection() {
  const requirements = [
    {
      icon: Smartphone,
      title: 'Compatible Phone',
      description: 'iOS or Android smartphone with sufficient storage and processing power.',
    },
    {
      icon: Wifi,
      title: 'Internet Connection',
      description: 'Stable internet connection to run the Unity app and participate in the network.',
    },
  ];

  return (
    <section id="requirements" className="py-16 sm:py-20">
      <div className="container px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Requirements</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          What you need to get started with Unity leasing.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {requirements.map((req, index) => (
            <Card key={index}>
              <CardContent className="pt-8 pb-8 text-center">
                <req.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">{req.title}</h3>
                <p className="text-muted-foreground">{req.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
