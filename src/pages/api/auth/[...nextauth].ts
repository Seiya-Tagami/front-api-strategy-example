import NextAuth from 'next-auth';
import type { DefaultSession, NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import jwt from 'jsonwebtoken';

export const authOptions: NextAuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID ?? '',
			clientSecret: process.env.GITHUB_SECRET ?? '',
		}),
		// ...add more providers here
	],
	callbacks: {
		async jwt({ token, user, profile }) {
			if (user) {
				const jwtSeacret = process.env.MY_JWT_SECRET;

				if (!jwtSeacret) {
					throw new Error('MY_JWT_SECRET is not defined');
				}

				if (!profile) {
					throw new Error('profile is not defined');
				}

				const jwtClaims = {
					sub: profile.id.toString(),
					name: profile.name ?? (profile && profile.login),
					email: profile.email,
				};

				const myToken = jwt.sign(jwtClaims, jwtSeacret, {
					algorithm: 'HS256',
					expiresIn: '365d',
				});

				token.access_token = myToken;
			}
			return { ...token };
		},
		async session({ session, token }) {
			session.user = token
			return session
		},
	},
};

// idとloginが型宣言されていないので、型宣言を追加する
declare module 'next-auth' {
	interface Profile {
		id: string;
		login: string;
	}
	interface Session {
		user: {
			access_token?: string
		} & DefaultSession['user']
	}
}
declare module 'next-auth/jwt' {
	interface JWT {
		access_token?: string
	}
}

export default NextAuth(authOptions);