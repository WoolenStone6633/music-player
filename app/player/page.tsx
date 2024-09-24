import { Suspense } from "react";
import ArtGraphic from "../ui/artGraphic"
import SongCard from "../ui/songCard"
import { getSongs } from "../lib/apiCalls";

export default async function Page({searchParams}: {searchParams?: {query?: string, page?: string}}) {
  const query = searchParams?.query
  const songList = getSongs(query)
  
  return (
    <main className="text-center mt-16">
      <Suspense>
        {songList ? songList.map( song => {
          <SongCard img='string' title='string' temp={song}/>
        }): <></>}
        {/* <p>{songList}</p> */}
      </Suspense>
      <div>
        <ArtGraphic/>
        <p>This is the title of the song</p>
      </div>
    </main>
  );
}
