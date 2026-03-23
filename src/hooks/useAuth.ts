import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

export interface AppUser {
  id: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
}

export function useAuth() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        if (session?.user) {
          setUser(mapUser(session.user));
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // THEN get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        setUser(mapUser(session.user));
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return { user, session, loading, signOut };
}

function mapUser(u: User): AppUser {
  return {
    id: u.id,
    email: u.email || "",
    displayName: u.user_metadata?.full_name || u.email?.split("@")[0],
    avatarUrl: u.user_metadata?.avatar_url,
  };
}
