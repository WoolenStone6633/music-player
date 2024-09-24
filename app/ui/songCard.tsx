export default function SongCard( {img, title, temp}: {img: string, title: string, temp:any} ) {
  return (
    <div>
      <p>{img}{title}{temp}</p>
      <p>This is an image</p>
      <p>This is where I will display all the music things</p>
    </div>
  )
}