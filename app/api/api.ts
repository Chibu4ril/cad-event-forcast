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

export const modelPrediction = async (selectedFileUrl: string | null) => {
  if (!selectedFileUrl) {
    console.error("Event name and dataset must be selected.");
    return;
  }

  try {
    const response = await fetch(
      "https://cad-backend-lcaa.onrender.com/api/runPrediction",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedFileUrl }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to execute prediction script");
    }

    const result = await response.json();
    // console.log("Prediction script output:", result.output || result.error);
    return result; // Return result for further processing
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow for handling at the component level
  }
};
