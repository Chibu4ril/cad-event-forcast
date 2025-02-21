export const fetchUploadedFiles = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/files");
    const data = await response.json();
    return data.files || [];
  } catch (error) {
    console.error("Error fetching files:", error);
    return [];
  }
};
