import LoginButton from "./ui/loginButton";

export default function Home() {
  return (
    <main className="text-center mt-16">
      <p>Welcome to the Music PLayer! Login with spotify to continue:</p>
      <div className="flex justify-center gap-4">
        <LoginButton text={'Login'}/>
      </div>
    </main>
  );
}
