"use client";

import { useDeferredValue, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Weapons } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedFilter, setSelectedFilter] = useState<string | null>(
    searchParams.get("filter")
  );

  const deferredFilter = useDeferredValue(selectedFilter);

  useEffect(() => {
    if (deferredFilter !== searchParams.get("filter")) {
      const newParams = new URLSearchParams(searchParams.toString());
      if (deferredFilter) {
        newParams.set("filter", deferredFilter);
      } else {
        newParams.delete("filter");
      }
      router.push(`?${newParams.toString()}`);
    }
  }, [deferredFilter, router, searchParams]);

  const handleFilterClick = (weapon: string) => {
    setSelectedFilter((prevFilter) => (prevFilter === weapon ? null : weapon));
  };

  return (
    <div className="flex flex-wrap gap-2">
      {Weapons.map((weapon) => (
        <Button
          size="sm"
          key={weapon.title}
          variant={selectedFilter === weapon.title ? "secondary" : "default"}
          onClick={() => handleFilterClick(weapon.title)}
        >
          <weapon.icon className="mr-0.5" size={16} />
          {weapon.title}
        </Button>
      ))}
    </div>
  );
}
