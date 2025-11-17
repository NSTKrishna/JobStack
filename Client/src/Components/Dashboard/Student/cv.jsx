import { useState, useRef } from "react";
import { useUploadCV } from "../../../Api/hooks";
import { useAuthStore } from "../../../Api/store";

function MyCV() {
  const { handleUploadCV, loading, error } = useUploadCV();
  const user = useAuthStore((state) => state.user);
  const fileInputRef = useRef(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF or Word document");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    try {
      await handleUploadCV(file);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My CV</h1>
          <p className="text-gray-500 text-lg">Upload and manage your resume</p>
        </div>

        {/* Upload CV Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-20">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Document Icon */}
            <div className="mb-6">
              <svg
                className="w-24 h-24 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>

            {/* CV Status */}
            {user?.cvUrl ? (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  CV Uploaded Successfully
                </h2>
                <p className="text-gray-500 text-base mb-6">
                  {user.cvFileName || "Your CV is ready"}
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  No CV Uploaded
                </h2>
                <p className="text-gray-500 text-base mb-6">
                  Upload your CV to apply for jobs more easily.
                </p>
              </>
            )}

            {/* Success Message */}
            {uploadSuccess && (
              <div className="mb-4 text-green-600 font-medium">
                CV uploaded successfully!
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-4 text-red-600 font-medium">{error}</div>
            )}

            {/* Upload Button */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              onClick={handleButtonClick}
              disabled={loading}
              className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Uploading..."
                : user?.cvUrl
                ? "Update CV"
                : "Upload CV"}
            </button>
            <p className="text-sm text-gray-400 mt-3">
              Supported formats: PDF, DOC, DOCX (Max 5MB)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCV;
