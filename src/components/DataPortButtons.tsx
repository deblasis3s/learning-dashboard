"use client";

// === DATA EXPORT/IMPORT BUTTONS ===
// Export: downloads your progress as a JSON file.
// Import: uploads a JSON file to restore progress.

import { useRef } from "react";
import { useProgressContext } from "@/hooks/useProgress";
import { exportToJSON, importFromJSON } from "@/lib/progress";

export default function DataPortButtons() {
  const { progress, updateProgress, isLoaded } = useProgressContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isLoaded) return null;

  // Export: trigger JSON file download
  const handleExport = () => {
    exportToJSON(progress);
  };

  // Import: open file picker, then load the JSON
  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await importFromJSON(file);
      updateProgress(data);
      alert("Progress imported successfully!");
    } catch (err) {
      alert(`Import failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
    // Reset the file input so the same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleExport}
        className="text-sm px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
      >
        Export JSON
      </button>
      <button
        onClick={() => fileInputRef.current?.click()}
        className="text-sm px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
      >
        Import JSON
      </button>
      {/* Hidden file input for the import button */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
      />
    </div>
  );
}
