import React from 'react';
import { ExternalLink, PlayCircle } from 'lucide-react';

const shorts = [
  {
    id: 'short-1',
    videoId: 'JqKmxZaWp-c',
    title: 'Getting Started with Unity Nodes',
    description: 'A quick guide to getting started with the Unity Nodes app and the ULO Mobile Edge Network.',
  },
  {
    id: 'short-2',
    videoId: 'gdBxIyO-cIg',
    title: 'How to Use Your Lease Code',
    description: 'Learn how to claim and activate your lease code inside the Unity Nodes app.',
  },
];

export default function TutorialsSection() {
  return (
    <section id="tutorials" className="py-16 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <PlayCircle className="w-4 h-4" />
            Video Tutorials
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Tutorials &amp; Setup Guide
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Watch these short guides to get started with Unity Nodes quickly.
          </p>
        </div>

        {/* Two-video balanced grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {shorts.map((short) => (
            <div key={short.id} className="flex flex-col gap-3">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-border bg-card">
                {/* Portrait 9:16 aspect ratio */}
                <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${short.videoId}?rel=0&modestbranding=1`}
                    title={short.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground leading-snug">{short.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{short.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Channel CTA */}
        <div className="flex justify-center mt-10">
          <a
            href="https://www.youtube.com/@UnityNodesIO/shorts"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors shadow"
          >
            <ExternalLink className="w-4 h-4" />
            View All Shorts on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}
