import { Send } from "lucide-react";

import Link from "next/link";

import { buttonCVA } from "../components/button/buttonCVA";

export default function NotFound() {
  return (
    <div className="mt-32 flex flex-col items-center gap-4">
      <h1 className="text-6xl font-semibold text-red-500">404</h1>
      <p className="text-lg text-gray-600">
        Oops! Looks like you&apos;re lost.
      </p>
      <Link href=".." className={buttonCVA({ variant: "outline", size: "xl" })}>
        Let&apos;s go back
        <div className="animate-pulse">
          <Send />
        </div>
      </Link>
    </div>
  );
}
