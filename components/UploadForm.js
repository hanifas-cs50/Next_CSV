"use client";

import { useState } from "react";
import { uploadCSV } from "@/lib/tableActions";

export default function UploadForm() {
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setIsUploading(true);

    try {
      const result = await uploadCSV(formData);
      setMessage(result.message);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <input
        type="file"
        name="file"
        accept=".csv"
        required
        className="w-full border rounded px-4 py-2"
      />
      <button
        type="submit"
        disabled={isUploading}
        className="w-full bg-blue-600 font-medium text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {isUploading ? "Uploading..." : "Upload"}
      </button>
      {message && (
        <p className="text-center text-sm text-gray-600 mt-2">{message}</p>
      )}
    </form>
  );
}
