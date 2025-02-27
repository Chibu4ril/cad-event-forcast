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

export const handleFileDelete = async (fileUrl: string) => {
  try {
    const filename = fileUrl.split("/").pop()?.split("?")[0];

    if (!filename) {
      return;
    }

    const { error } = await supabase.storage.from("uploads").remove([filename]);

    if (error) {
      console.error("Error deleting file from Supabase:", error.message);
    } else {
      // console.log("File deleted successfully:", filename);
      window.location.reload();
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};
