"use client";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Searchbar = ({ type }: { type: string }) => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (search) {
        router.push(`/${type}?search=${search}`);
      } else {
        router.push(`/${type}`);
      }
    }, 300);

    // cleanup timeout
    return () => clearTimeout(debounce);
  }, [search, type]);

  return (
    <div className="border-primary border flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 w-full">
      <Search className="text-primary h-8 w-8" />
      <Input
        className="border-none bg-secondary text-base text-secondary-foreground outline-none"
        id="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`${type === "jobs" ? "Search Jobs" : "Search Users"}`}
      />
    </div>
  );
};

export default Searchbar;
