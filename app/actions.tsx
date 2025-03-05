"use client";
import { createBrowserClient } from "@supabase/ssr"; // Client-side Supabase initialization

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const handleFileChange = async (file: File, fileName: string) => {
  try {
    const { data: existingFiles, error: listError } = await supabase.storage
      .from("uploads")
      .list("", { search: fileName });

    if (listError) {
      console.error("Error checking for existing file:", listError.message);
      return { error: listError };
    }

    if (existingFiles && existingFiles.some((f) => f.name === fileName)) {
      return { error: "File already exists in Supabase storage." };
    }
    const { error } = await supabase.storage
      .from("uploads")
      .upload(`${fileName}`, file, { upsert: true });

    if (error) {
      return { error };
    }

    return { filePath: `uploads/${fileName}` };
  } catch (error) {
    console.error("Unexpected error during file upload:", error);
    return { error: "Unexpected error occurred" };
  }
};

export const handleDatasetUpload = async (file: File, fileName: string) => {
  try {
    const { data: existingFiles, error: listError } = await supabase.storage
      .from("training_set")
      .list("", { search: fileName });

    if (listError) {
      console.error("Error checking for existing file:", listError.message);
      return { error: listError };
    }

    if (existingFiles && existingFiles.some((f) => f.name === fileName)) {
      return { error: "File already exists in Supabase storage." };
    }
    const { error } = await supabase.storage
      .from("training_set")
      .upload(`${fileName}`, file, { upsert: true });
    if (error) {
      return { error };
    }
    return { filePath: `training_set` };
  } catch (error) {
    console.error("Unexpected error during file upload:", error);
    return { error: "Unexpected error occurred" };
  }
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
