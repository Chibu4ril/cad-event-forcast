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

export const handleDatasetUpload = async (file: File, fileName: string) => {
  const { error } = await supabase.storage
    .from("training_set")
    .upload(`${fileName}`, file, { upsert: true });
  if (error) {
    return { error };
  }
  return { filePath: `training_set` };
};

export const handleFileDelete = async (fileUrl: string) => {
  try {
    const filename = fileUrl.split("/").pop()?.split("?")[0];

    if (!filename) {
      return;
    }

    // Check which bucket the file belongs to based on the URL
    let bucket = "";
    if (fileUrl.includes("uploads")) {
      bucket = "uploads";
    } else if (fileUrl.includes("training_set")) {
      bucket = "training_set";
    }

    if (!bucket) {
      console.error("Error: File does not belong to a known bucket");
      return;
    }

    const { error } = await supabase.storage.from(bucket).remove([filename]);

    if (error) {
      console.error("Error deleting file from Supabase:", error.message);
    } else {
      console.log(`File deleted successfully from ${bucket}:`, filename);
      window.location.reload(); // Optionally refresh the page after deleting the file
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};
