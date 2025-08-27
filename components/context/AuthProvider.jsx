"use client";
import { createContext, useState, useEffect, useCallback } from "react";
import client from "@/api/client";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId) => {
    if (!userId) {
      setProfile(null);
      return;
    }
    const { data, error } = await client
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      setProfile(null);
    } else {
      setProfile(data);
    }
  }, []);

  const fetchNotifications = useCallback(async (userId) => {
    if (!userId) {
      setNotifications([]);
      return;
    }
    const { data, error } = await client
      .from("notifications")
      .select(
        "*, actor:profiles!actor_id(username, avatar_url), post:posts(post_id, title)"
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) console.error("Error fetching notifications:", error);
    else setNotifications(data || []);
  }, []);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await client.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
        await fetchNotifications(session.user.id);
      }
      setLoading(false);
    };
    getSession();

    const { data: listener } = client.auth.onAuthStateChange((e, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      fetchProfile(currentUser?.id);
      fetchNotifications(currentUser?.id);
      if (e === "SIGNED_IN" || e === "SIGNED_OUT" || e === "USER_UPDATED") {
        setLoading(false);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [fetchProfile, fetchNotifications]);

  // Realtime subscription for notifications
  useEffect(() => {
    if (!user) return;

    const channel = client
      .channel(`public:notifications:user_id=eq.${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          toast.info("You have a new notification!");
          fetchNotifications(user.id);
        }
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  }, [user, fetchNotifications]);

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, fetchProfile, notifications, fetchNotifications }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
