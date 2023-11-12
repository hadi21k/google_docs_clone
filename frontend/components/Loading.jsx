import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <>
      <div className="mt-4 grid h-full gap-6 grid-cols-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <Skeleton className="h-16 w-full bg-secondary" />
          </div>
        ))}
      </div>
    </>
  );
}
