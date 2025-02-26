"use client";
import { createBrowserClient } from "@supabase/ssr"; // Client-side Supabase initialization

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const handleFileChange = async (file: File, fileName: string) => {
  const { error } = await supabase.storage
    .from("uploads")
    .upload(`${fileName}`, file, { upsert: true });

  if (error) {
    return { error };
  }

  return { filePath: `uploads/${fileName}` };
};

export const handleFileDelete = async () => {
  const { error } = await supabase.storage
    .from("uploads")
    .remove(["object-path-2", "folder/avatar2.png"]);
};
