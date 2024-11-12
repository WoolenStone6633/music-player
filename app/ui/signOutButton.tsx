import { deleteSessionTokenCookie, getCurrentSession, invalidateSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { deleteSpotifyToken } from "../lib/spotifyCalls";

export default async function SignOutButton() {
	return (
		<form action={logout}>
			<button>Sign out</button>
		</form>
	);
}

async function logout(): Promise<ActionResult> {
	"use server";
	const { session } = await getCurrentSession();
	if (!session) {
		return {
			error: "Unauthorized"
		};
	}

	await invalidateSession(session.id);
	await deleteSessionTokenCookie()
	await deleteSpotifyToken()
	cookies().delete('spotify_oauth_state')
	return redirect("/");
}

interface ActionResult {
	error: string | null;
}