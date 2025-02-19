"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

export default function Filters({ entity, filterOptions, existingFilters }) {
  const router = useRouter();

  const [filters, setFilters] = useState(() => {
    const initialFilters = {};
    filterOptions.forEach(({ key }) => {
      let value = existingFilters?.[key] || "";
      if (value === "all") value = ""; // Convert "all" to an empty string
      initialFilters[key] = value;
    });
    return initialFilters;
  });


  useEffect(() => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    params.set("page", "1"); // Reset to first page when filters change
    router.push(`/${entity}?${params.toString()}`);
  }, [filters, router, entity]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="flex flex-wrap gap-4 p-4 mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      {filterOptions.map(({ key, type, placeholder, options }) => (
        <div key={key} className="flex flex-col">
          {type === "text" && (
            <Input
              placeholder={placeholder}
              value={filters[key]}
              onChange={(e) => handleFilterChange(key, e.target.value)}
              className="border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
          )}
          {type === "select" && (
            <Select onValueChange={(value) => handleFilterChange(key, value)} value={filters[key] || undefined}>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value || ""}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      ))}
    </Card>
  );
}
