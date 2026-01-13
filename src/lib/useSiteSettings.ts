"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { SiteSetting } from "@/lib/types";

// Default values when database is not available
const DEFAULT_SETTINGS: Record<string, string> = {
  whatsapp_link: "https://wa.me/33631702848",
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<Record<string, string>>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("*");

        if (error) {
          console.warn("Could not fetch site settings:", error.message);
          return;
        }

        if (data && data.length > 0) {
          const settingsMap: Record<string, string> = { ...DEFAULT_SETTINGS };
          data.forEach((setting: SiteSetting) => {
            settingsMap[setting.key] = setting.value;
          });
          setSettings(settingsMap);
        }
      } catch (err) {
        console.warn("Error fetching site settings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading };
}

// Simple function to get a single setting (for one-time use)
export async function getSiteSetting(key: string): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", key)
      .single();

    if (error) {
      return DEFAULT_SETTINGS[key] || null;
    }

    return data?.value || DEFAULT_SETTINGS[key] || null;
  } catch {
    return DEFAULT_SETTINGS[key] || null;
  }
}
