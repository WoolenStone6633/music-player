type props = {
  imgUrl: string, 
  title: string, 
  artistStr: string,
  background: React.LegacyRef<HTMLDivElement>,
  bar: React.LegacyRef<HTMLDivElement>,
  clickHandler(): void,
}

export default function SongCard({imgUrl, title, artistStr, background, bar, clickHandler}: props) {
  return (
    <div className="contain-paint mb-4 border-2 rounded-2xl bg-gray-200 transition ease-out duration-100 hover:bg-gray-300 hover:border-gray-300" style={{ cursor: 'pointer' }} onClick={clickHandler}>
      <div ref={background} className="relative flex pr-2 bg-transparent">
        <div ref={bar} className="hidden absolute h-full w-72 rounded-3x1 blur-md overflow- bg-gray-50 opacity-50"/>
        <img src={imgUrl} width={64} height={64}></img>
        <div className="my-auto ml-2 text-left">
          <p>{title}</p>
          <p className="text-gray-500">{artistStr}</p>
        </div>
      </div>
    </div>
  )
}