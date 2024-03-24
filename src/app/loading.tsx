import { Spinner } from "@/components/spinner/Spinner";

export default function Loading() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <Spinner>Loading...</Spinner>
    </div>
  );
}
