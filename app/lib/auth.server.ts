import { Authenticator } from "remix-auth";
import { GitHubStrategy } from "remix-auth-github";
import { GoogleStrategy } from "remix-auth-google";
import type { User } from "~/types";
import { sessionStorage } from "./session.server";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<User>(sessionStorage);

// Google Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  authenticator.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async ({ accessToken, refreshToken, extraParams, profile }) => {
        // Get the user data from your DB or API using the tokens and profile
        // TODO: Enable when Prisma client is generated
        // const user = await prisma.user.upsert({
        //   where: { email: profile.emails[0].value },
        //   update: {
        //     name: profile.displayName,
        //     avatar: profile.photos[0].value,
        //   },
        //   create: {
        //     email: profile.emails[0].value,
        //     name: profile.displayName,
        //     avatar: profile.photos[0].value,
        //     provider: "google",
        //     providerId: profile.id,
        //   },
        // });

        // Mock user for now
        const user: User = {
          id: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          avatar: profile.photos[0].value,
          provider: "google",
          providerId: profile.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        return user;
      }
    )
  );
}

// GitHub Strategy
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  authenticator.use(
    new GitHubStrategy(
      {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        redirectURI: "/auth/github/callback",
      },
      async ({ profile }) => {
        // Get the user data from your DB or API using the tokens and profile
        // TODO: Enable when Prisma client is generated
        // const user = await prisma.user.upsert({
        //   where: { email: profile.emails[0].value },
        //   update: {
        //     name: profile.displayName || profile.name.givenName,
        //     avatar: profile.photos[0].value,
        //   },
        //   create: {
        //     email: profile.emails[0].value,
        //     name: profile.displayName || profile.name.givenName,
        //     avatar: profile.photos[0].value,
        //     provider: "github",
        //     providerId: profile.id,
        //   },
        // });

        // Mock user for now
        const user: User = {
          id: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName || profile.name.givenName,
          avatar: profile.photos[0].value,
          provider: "github",
          providerId: profile.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        return user;
      }
    )
  );
}
