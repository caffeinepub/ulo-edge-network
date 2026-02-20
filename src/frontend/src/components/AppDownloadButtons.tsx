import { Button } from '@/components/ui/button';
import { SiApple, SiAndroid } from 'react-icons/si';

export default function AppDownloadButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Button asChild size="lg" className="w-full sm:w-auto gap-3 text-base h-14 px-8">
        <a
          href="https://apps.apple.com/us/app/unity-network-app/id6755482738"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiApple className="h-6 w-6" />
          Download for iOS
        </a>
      </Button>
      <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto gap-3 text-base h-14 px-8">
        <a
          href="https://play.google.com/store/apps/details?id=io.unitynodes.unityapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiAndroid className="h-6 w-6" />
          Download for Android
        </a>
      </Button>
    </div>
  );
}
