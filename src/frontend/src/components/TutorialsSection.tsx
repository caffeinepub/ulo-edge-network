export default function TutorialsSection() {
  return (
    <section id="tutorials" className="py-16 sm:py-20">
      <div className="container px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Video Tutorials</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Watch these helpful guides to get started with Unity and start earning with your mobile device.
        </p>
        <div className="max-w-4xl mx-auto">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/yAqpPAHMzPY"
              title="How to Install Unity SDK & Start Earning (APK Tutorial)"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            How to Install Unity SDK & Start Earning (APK Tutorial)
          </p>
        </div>
      </div>
    </section>
  );
}
