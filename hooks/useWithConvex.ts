"use client";
import { useSession } from "@/lib/auth-client";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/store/useCurrentUser";

export function useAuthWithConvex() {
  const { data: session, isPending: sessionLoading } = useSession();
  const [isInitialized, setIsInitialized] = useState(false);
  const { setCurrentUser } = useCurrentUser();

  // Convex mutations
  const createUser = useMutation(api.users.createUser);

  // Convex query to get full user data
  const convexUser = useQuery(
    api.users.getUserByEmail,
    session?.user?.email ? { email: session.user.email } : "skip"
  );

  // Sync Better Auth user to Convex when session changes
  useEffect(() => {
    async function syncUser() {
      if (session?.user && !isInitialized) {
        try {
          await createUser({
            email: session.user.email,
            name: session.user.name,
            image: session.user.image || "",
            provider: "google",
            providerId: session.user.id,
          });
          setIsInitialized(true);
          const user = {
            email: session.user.email,
            name: session.user.name,
            image: session.user.image || "",
          };
          setCurrentUser(user);
        } catch (error) {
          console.error("Failed to sync user to Convex:", error);
        }
      }
    }

    syncUser();
  }, [session, isInitialized, createUser]);

  return {
    // Better Auth session data
    session,
    sessionLoading,

    // Convex user data (with additional fields you might have)
    convexUser,
    convexUserLoading: convexUser === undefined && session?.user,

    // Combined loading state
    loading: sessionLoading || (session?.user && convexUser === undefined),

    // User is fully loaded in both systems
    user:
      session?.user && convexUser
        ? {
            ...session.user,
            convexId: convexUser._id, // Convex document ID
            created_at: convexUser.created_at,
            // Any other Convex-specific fields
          }
        : null,
  };
}
