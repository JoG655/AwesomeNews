"use client";

import { useEffect } from "react";

import { Button } from "@/components/button/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <Button variant="outline" size="xl" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
