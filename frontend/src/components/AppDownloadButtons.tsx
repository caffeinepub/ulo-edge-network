export default function AppDownloadButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <a
        href="https://apps.apple.com/us/app/unity-network-app/id6755482738"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block transition-opacity hover:opacity-80 active:opacity-70"
      >
        <img
          src="/assets/generated/appstore-badge.dim_240x80.png"
          alt="Download on the App Store"
          className="h-14 w-auto"
        />
      </a>
      <a
        href="https://play.google.com/store/apps/details?id=io.unitynodes.unityapp"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block transition-opacity hover:opacity-80 active:opacity-70"
      >
        <img
          src="/assets/generated/googleplay-badge.dim_240x80.png"
          alt="Get it on Google Play"
          className="h-14 w-auto"
        />
      </a>
    </div>
  );
}
