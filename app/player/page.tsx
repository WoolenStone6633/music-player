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
    <main className="flex">
      <div className="max-w-fit">
        <Suspense key={query} fallback={<TrackListSkeleton/>}>
          <TrackList query={query}/>
        </Suspense>
      </div>
      <div>
        <StreamProcesser/>
        <SongPlayer accessToken={accessToken} trackUri={searchParams?.id}/>
      </div>
    </main>
  );
}