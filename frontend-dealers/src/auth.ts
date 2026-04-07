import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        console.log("Authorize called with credentials:", credentials);
        if (!credentials) {
          return null;
        }
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });
          const user = await res.json();
          console.log("Authorize Response:", user);
          if (!res.ok || !user) {
            return null;
          }

          // Must return a user object
          return {
            id: user.data.user.id,
            name: user.data.user.name,
            email: user.data.user.email,
            token: user.data.accessToken,
            refreshToken: user.data.refreshToken,
            expiresIn: user.data.expiresIn,
          };
        } catch (error) {
          console.error("Credentials authorize failed:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // Persist access token from authorize() result
        token.accessToken = (user as { token?: string }).token;
      }

      return token;
    },

    async session({ session, token }) {
      // Ensure user object exists and copy fields
      session.user = session.user ?? ({} as typeof session.user);
      session.user.id = token.id as string;
      session.accessToken = token.accessToken as string | undefined;

      return session;
    },
  },

  events: {
    async signOut(message) {
      console.log("Sign out event triggered with message:", message);
      try {
        const accessToken =
          (message as { token?: { accessToken?: string } })?.token
            ?.accessToken ||
          (message as { session?: { accessToken?: string } })?.session
            ?.accessToken;

        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          },
        });
      } catch (error) {
        console.error("Sign out API call failed:", error);
      }
    },
  },
});
