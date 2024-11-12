export function SongCardSkeleton() {
  return (
    <div className="flex mb-4 border-2 pr-2 rounded-2xl bg-gray-200">
      <div className="w-16 h-16 rounded-md bg-gray-300 "/>
      <div className="grid gap-3 my-auto ml-2">
        <div className="w-44 h-3 rounded-md bg-gray-300"/>
        <div className="w-24 h-3 rounded-md bg-gray-300"/>
      </div>
    </div>
    )
}

export function TrackListSkeleton() {
  const cards = Array(13).fill(<SongCardSkeleton/>)

  return ( 
    <>
      {cards.map((card: JSX.Element, index: number) => {return <div key={index}>{card}</div>})}
    </>
  )
}