import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

type RefreshTokenResponse = {
  success?: boolean;
  message?: string;
  data?: {
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
  };
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
};

const refreshAccessToken = async (token: {
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpires?: number;
}) => {
  if (!token.refreshToken) {
    return { ...token, error: "MissingRefreshToken" };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: token.refreshToken }),
      },
    );

    if (!res.ok) {
      return { ...token, error: "RefreshAccessTokenError" };
    }

    const refreshed: RefreshTokenResponse | null = await res
      .json()
      .catch(() => null);
    const accessToken = refreshed?.data?.accessToken ?? refreshed?.accessToken;
    const refreshToken = refreshed?.data?.refreshToken ?? refreshed?.refreshToken;
    const expiresIn = refreshed?.data?.expiresIn ?? refreshed?.expiresIn ?? 900;

    if (!accessToken) {
      return { ...token, error: "RefreshAccessTokenError" };
    }

    return {
      ...token,
      accessToken,
      refreshToken: refreshToken ?? token.refreshToken,
      accessTokenExpires: Date.now() + expiresIn * 1000,
      error: undefined,
    };
  } catch (error) {
    console.error("Refresh access token failed:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
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
      const refreshBufferMs = 60 * 1000;
      if (user) {
        token.id = user.id;
        // Persist access token from authorize() result
        token.accessToken = (user as { token?: string }).token;
        token.refreshToken = (user as { refreshToken?: string }).refreshToken;
        const expiresIn = (user as { expiresIn?: number }).expiresIn ?? 900;
        token.accessTokenExpires = Date.now() + expiresIn * 1000;
      }

      if (
        token.accessTokenExpires &&
        Date.now() < token.accessTokenExpires - refreshBufferMs
      ) {
        return token;
      }

      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      // Ensure user object exists and copy fields
      session.user = session.user ?? ({} as typeof session.user);
      session.user.id = token.id as string;
      session.accessToken = token.accessToken as string | undefined;
      session.error = token.error as string | undefined;

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
