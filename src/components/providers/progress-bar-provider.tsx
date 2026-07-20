"use client";

import NextTopLoader from "nextjs-toploader";

export function ProgressBarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NextTopLoader
      color="#6EB52C"
      initialPosition={0.08}
      crawlSpeed={200}
      height={4}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
      shadow="0 0 10px rgba(110, 181, 44, 0.4)"
      />
      {children}
    </>
  );
}
