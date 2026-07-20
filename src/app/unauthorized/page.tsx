"use client";

import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="max-w-md w-full text-center px-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Access Denied
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8">
          You don not have permission to access this page. Please contact your
          administrator if you believe this is an error.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Go to Home
          </button>

          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
