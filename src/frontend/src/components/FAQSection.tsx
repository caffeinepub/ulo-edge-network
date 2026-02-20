import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FAQSection() {
  const faqs = [
    {
      question: 'How do I use a lease code?',
      answer:
        'After copying a lease code from this website, open the Unity mobile app on your device. Navigate to the lease code entry section and paste the code. The app will validate and activate your lease, allowing you to start earning.',
    },
    {
      question: 'Can lease codes be reused?',
      answer:
        'No, each lease code is for single use only. Once a code has been claimed and activated in the Unity app, it cannot be used again. If you try to use an already-claimed code, the app will indicate that it is invalid.',
    },
    {
      question: 'What happens if a code shows as unavailable?',
      answer:
        'If a lease code is marked as "Unavailable" on this site, it means it has already been claimed by another user. Please select a different code that shows as "Available" to ensure successful activation.',
    },
    {
      question: 'How are rewards calculated?',
      answer:
        'Rewards are calculated based on your device\'s contribution to the Unity network and the split ratio of your lease agreement. The split ratio (e.g., 60/40) determines how earnings are divided between the UNO and ULO.',
    },
    {
      question: 'What devices are compatible?',
      answer:
        'The Unity app is compatible with most modern iOS and Android smartphones. Check the app store listings for specific device requirements and ensure you have a stable internet connection.',
    },
    {
      question: 'How do I maximize my earnings?',
      answer:
        'To maximize earnings, keep the Unity app running consistently on your device, maintain a stable internet connection, and ensure your device meets all performance requirements. Regular monitoring and maintenance will help optimize your contribution to the network.',
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-20 bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Find answers to common questions about Unity leasing.
        </p>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
