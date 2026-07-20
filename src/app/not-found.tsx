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
          <div className="rounded-full bg-[#1D3E6B] p-6">
            <FileQuestion className="h-16 w-16 text-white " />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="mb-2 text-7xl font-bold text-[#1D3E6B]">404</h1>

        {/* Title */}
        <h2 className="mb-3 text-2xl font-semibold text-[#1D3E6B]">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mb-8 text-[#1D3E6B]">
          Sorry, we could not find the page you are looking for. The page might
          have been removed or the URL might be incorrect.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="gap-2 bg-[#1D3E6B] hover:bg-[#1D3E6B]">
            <Link href="/">
              <Home className="h-4 w-4" />
              Go to Home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 cursor-pointer "
            onClick={() => router.back()}
          >
            <div className="text-[#1D3E6B]">
              <ArrowLeft className="h-4 w-4 text-[#1D3E6B]" />
              Go Back
            </div>
          </Button>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-sm text-muted-foreground">
          Need help?{" "}
          <Link href="/dashboard" className="text-primary hover:underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}
