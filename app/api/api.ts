"use client";

export const fetchUploadedFiles = async () => {
  try {
    const response = await fetch(
      "https://cad-backend-lcaa.onrender.com/api/files"
    );
    const data = await response.json();
    return data.files || [];
  } catch (error) {
    console.error("Error fetching files:", error);
    return [];
  }
};

export const deletedUploadedFiles = async (fileUrl: string) => {
  try {
    const response = await fetch(
      "https://cad-backend-lcaa.onrender.com/api/delete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileUrl }),
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to delete file: ${response.statusText}`);
    }

    return { success: true, message: "File deleted successfully" };
  } catch (error) {
    console.error("Error deleting file:", error);
    return { success: false, message: "Failed to delete file" };
  }
};
