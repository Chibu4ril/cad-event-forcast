"use client";

interface File {
  name: string;
  url: string;
  filePathURL: string;
  fileDirectory: string;
}

export const fetchUploadedFiles = async (): Promise<{
  normal_files: File[];
  // datasets: File[];
}> => {
  try {
    const response = await fetch(
      "https://cad-backend-lcaa.onrender.com/api/files"
    );
    const data = await response.json();
    if (!data || typeof data !== "object") {
      console.error("Invalid API response:", data);
      return { normal_files: [] };
    }
    // return { normal_files: [], datasets: [] };

    return {
      normal_files: Array.isArray(data.normal_files) ? data.normal_files : [],
      // datasets: Array.isArray(data.datasets) ? data.datasets : [],
    };
  } catch (error) {
    console.error("Error fetching files:", error);
    return { normal_files: [] };
    // return { normal_files: [], datasets: [] };
  }
};

export const modelPrediction = async (selectedFileUrl: string | null) => {
  if (!selectedFileUrl) {
    console.error("⚠️ Testing Dataset must be selected.");
    return;
  }

  try {
    console.log("📤 Calling API with:", selectedFileUrl);

    const response = await fetch(
      "https://cad-backend-lcaa.onrender.com/api/runPrediction",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedFileUrl }),
      }
    );

    console.log("🚀 Raw Response:", response);

    if (!response.ok) {
      const errorText = await response.text(); // Read error response body
      console.error("❌ API Error:", errorText);
      throw new Error("Failed to execute prediction script");
    }

    const result = await response.json();
    console.log("📥 Parsed JSON Result:", result);

    return result; // Return result for further processing
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  }
};

// testin
