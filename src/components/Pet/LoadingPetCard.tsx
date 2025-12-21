import React from "react";
import { Skeleton } from "../ui/skeleton";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useMobile } from "@/hooks/ResponsiveHooks";

export default function LoadingPetCard() {
  const isMobile = useMobile();
  return (
    <Card className="rounded-lg border-none rtl h-80 w-full pb-1">
      {/* Header */}
      <CardHeader className="p-0 flex h-2/5 relative">
        <Skeleton className="h-full w-full rounded-t-lg" />

        {/* Avatar */}
        <div className="absolute left-1/2 top-[60%] -translate-x-1/2">
          <Skeleton className="w-20 h-20 md:w-25 md:h-25 rounded-full" />
        </div>
      </CardHeader>

      <div className="flex flex-col justify-between h-3/5">
        {/* Content */}
        <CardContent className="px-3 pb-2 mt-10">
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 md:h-5 w-24 md:w-32" />
            <Skeleton className="h-6 w-6 md:h-8 md:w-8 rounded-full" />
          </div>

          <Skeleton className="h-3 w-28 mt-3" />
          <Skeleton className="h-3 w-20 mt-2" />
        </CardContent>

        {/* Footer */}
        {isMobile ? (
          <CardFooter className="flex flex-col px-3 pb-2 gap-2">
            <Skeleton className="h-9 w-full rounded-md" />
            <Skeleton className="h-9 w-full rounded-md" />
          </CardFooter>
        ) : (
          <CardFooter className="flex justify-center gap-2">
            <Skeleton className="h-9 w-20 rounded-md" />
            <Skeleton className="h-9 w-20 rounded-md" />
          </CardFooter>
        )}
      </div>
    </Card>
  );
}
