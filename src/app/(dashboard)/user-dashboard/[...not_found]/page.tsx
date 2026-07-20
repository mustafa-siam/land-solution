"use client";
import Link from "next/link";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DashboardNotFoundPage() {
  const router = useRouter();
  return (
    <div className="flex min-h-[calc(100vh-170px)] items-center justify-center p-4">
      <div className="mx-auto max-w-md text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-[#1D3E6B] dark:bg-blue-700 p-6">
            <FileQuestion className="h-16 w-16 text-white" />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="mb-2 text-7xl font-bold text-[#1D3E6B] dark:text-blue-400">404</h1>

        {/* Title */}
        <h2 className="mb-3 text-2xl font-semibold text-[#1D3E6B] dark:text-blue-300">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mb-8 text-[#1D3E6B] dark:text-gray-300">
          Sorry, we could not find the page you are looking for. The page might
          have been removed or the URL might be incorrect.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className="gap-2 bg-[#1D3E6B] hover:bg-[#16335a] dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            <Link href="/dashboard">
              <Home className="h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 cursor-pointer border-[#1D3E6B] dark:border-blue-500"
            onClick={() => router.back()}
          >
            <div className="text-[#1D3E6B] dark:text-blue-400">
              <ArrowLeft className="h-4 w-4 text-[#1D3E6B] dark:text-blue-400" />
              Go Back
            </div>
          </Button>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-sm text-muted-foreground dark:text-gray-400">
          Need help?{" "}
          <Link href="/dashboard" className="text-primary dark:text-blue-400 hover:underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}
