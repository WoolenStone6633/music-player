import { Suspense } from "react";
import StreamProcesser from "../ui/streamProcesser"
import { getSpotifyAccessToken} from "../lib/spotifyCalls";
import SongPlayer from "../ui/songPlayer";
import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { TrackListSkeleton } from "../ui/skeletons";
import SpotifyTrackList from "../ui/spotifyTrackList";

export default async function Page({searchParams}: {searchParams?: {query?: string, page?: string, id?: string}}) {
  const { user } = await getCurrentSession()
  const accessToken = await getSpotifyAccessToken()
	if (!user) {
    redirect("/session_end")
	} else if (!accessToken) {
		redirect("/session_end")
  }

  const query = searchParams?.query || ''

  return (
    <div className="relative flex justify-center gap-28">
      <div className="w-[634px]">
        <Suspense key={query} fallback={<TrackListSkeleton/>}>
          <SpotifyTrackList query={query}/>
        </Suspense>
      </div>
      <div className="w-[592px] opacity-0"/>
      <div className="fixed flex flex-col left-[55%]">
        <p className="text-lg mx-auto mb-6 underline underline-offset-8">Start streaming to enjoy the visualizer.</p>
        <StreamProcesser/>
        <SongPlayer accessToken={accessToken} trackUri={searchParams?.id}/>
      </div>
    </div>
  );
}