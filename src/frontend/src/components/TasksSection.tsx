import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Activity, Shield } from 'lucide-react';

export default function TasksSection() {
  const tasks = [
    {
      icon: CheckCircle2,
      title: 'Verification',
      description: 'Complete initial verification steps in the Unity app to activate your lease code.',
    },
    {
      icon: Activity,
      title: 'Monitoring',
      description: 'Keep the Unity app running on your device to contribute to the network and earn rewards.',
    },
    {
      icon: Shield,
      title: 'Maintenance',
      description: 'Ensure your device stays connected and the app remains active for optimal performance.',
    },
  ];

  return (
    <section id="tasks" className="py-16 sm:py-20 bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Tasks</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Key activities to maximize your earnings as a Unity License Operator.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tasks.map((task, index) => (
            <Card key={index}>
              <CardContent className="pt-8 pb-8 text-center">
                <task.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
                <p className="text-muted-foreground">{task.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
