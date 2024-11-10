type props = {
  text: string, 
}

export default function LoginButton({text}: props) {
  return (
    <a href="/login/spotify">{text}</a>
  );
}