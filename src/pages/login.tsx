import { signIn, signOut } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'
import jwt from 'jsonwebtoken';
import { GetServerSideProps } from "next";
import Image from "next/image";

export default function Component({ session }: { session: any }) {

	if (session) {
		return (
			<>
				<div style={{display: "flex", alignItems: "center"}}>
					<Image style={{borderRadius: "50%"}} src={session.user?.picture} alt="Picture of the author" width={100} height={100} />
					<div style={{marginLeft: "20px"}}>
						<h1>Hello!! {session.user?.name}</h1>
						<div>Signed in as {session.user?.email}</div>	
					</div>
				</div>

				<button onClick={() => signOut()}>Sign out</button>
			</>
		)
	}
	return (
		<>
			Not signed in <br />
			<button onClick={() => signIn()}>Sign in</button>
		</>
	)
}

// SSRを用いて、有効期限が切れたJWTを持っていれば、ユーザーをログアウトさせる
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	// get access token and verify
	const session = await getServerSession(req, res, authOptions)
	const accessToken = session?.user?.access_token;
	const seacretkey = process.env.MY_JWT_SECRET;

	if (!session || !accessToken || !seacretkey) return { props: {} }

	if (session) {
		try {
			const decodedToken = jwt.verify(accessToken, seacretkey);
		} catch (error) {
			if (error instanceof jwt.TokenExpiredError) {
				// トークンの有効期限が切れた場合、ユーザーをログアウトさせます。
				signOut();
			}
		}
	}
	
	console.log(session)
	
	return {
		props: { session }
	}
}