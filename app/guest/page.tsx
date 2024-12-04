import { Suspense } from "react";
import StreamProcesser from "../ui/streamProcesser"
import { TrackListSkeleton } from "../ui/skeletons";
import DownloadedTrackList from "../ui/downloadedTrackList";

export default async function Page({searchParams}: {searchParams?: {id?: string}}) {

  return (
    <div className="relative flex justify-center gap-28">
      <div className="w-[634px]">
        <Suspense fallback={<TrackListSkeleton/>}>
          <DownloadedTrackList/>
        </Suspense>
      </div>
      <div className="w-[592px] opacity-0"/>
      <div className="fixed flex flex-col left-[55%]">
        <p className="text-lg mx-auto mb-6 underline underline-offset-8">Start streaming to enjoy the visualizer.</p>
        <StreamProcesser/>
        <audio className="pt-1" src={searchParams?.id} controls autoPlay/>
      </div>
    </div>
  );
}