import { Suspense } from "react";
import StreamProcesser from "../ui/streamProcesser"
import { getSpotifyAccessToken} from "../lib/spotifyCalls";
import SongPlayer from "../ui/songPlayer";
import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { TrackListSkeleton } from "../ui/skeletons";
import TrackList from "../ui/trackList";

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
          <TrackList query={query}/>
        </Suspense>
      </div>
      <div className="w-[592px] opacity-0"/>
      <div className="fixed mt-28 left-[55%]">
        <StreamProcesser/>
        <SongPlayer accessToken={accessToken} trackUri={searchParams?.id}/>
      </div>
    </div>
  );
}