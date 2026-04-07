"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const useAutoSignOutOnSessionError = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const hasHandledRef = useRef(false);

  useEffect(() => {
    if (!session?.error || hasHandledRef.current) return;
    hasHandledRef.current = true;

    const run = async () => {
      await signOut({ redirect: false });
      router.push("/auth");
    };

    run();
  }, [session?.error, router]);
};

export default useAutoSignOutOnSessionError;
