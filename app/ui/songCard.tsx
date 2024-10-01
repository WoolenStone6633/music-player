export default function SongCard( {img, title}: {img: string, title: string} ) {
  return (
    <div>
      <p>{img}{title}</p>
      <p>This is an image</p>
      <p>This is where I will display all the music things</p>
    </div>
  )
}