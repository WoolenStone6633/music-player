import LoginButton from "../ui/loginButton";

export default function Home() {
  return (
    <main className="text-center mt-16">
      <p>Your session has ended. Re-login with spotify to continue</p>
      <div className="flex justify-center gap-4">
        <LoginButton text={'Login'}/>
      </div>
    </main>
  );
}