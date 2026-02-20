import { Card, CardContent } from '@/components/ui/card';
import { Download, ClipboardCopy, Smartphone } from 'lucide-react';

export default function SetupGuideSection() {
  const steps = [
    {
      icon: Download,
      title: 'Download the Unity App',
      description: 'Get the Unity mobile app from the iOS App Store or Google Play Store for your device.',
    },
    {
      icon: ClipboardCopy,
      title: 'Claim a Lease Code',
      description: 'Browse available lease codes on this website and copy one to your clipboard.',
    },
    {
      icon: Smartphone,
      title: 'Enter Code in App',
      description: 'Open the Unity app, enter your lease code, and start earning with your mobile device.',
    },
  ];

  return (
    <section id="setup" className="py-16 sm:py-20 bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Setup Guide</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Get started in three simple steps and begin earning with Unity.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="relative">
              <CardContent className="pt-12 pb-8 text-center">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                  {index + 1}
                </div>
                <step.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
