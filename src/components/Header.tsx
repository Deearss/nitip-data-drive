"use client";

import { Search, HelpCircle, Settings } from "lucide-react";
import { useFileStore } from "@/lib/store";

export function Header() {
  const { searchQuery, setSearchQuery } = useFileStore();

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-zinc-200 bg-white">
      {/* Search Bar */}
      <div className="flex-1 max-w-2xl px-4 py-2 bg-zinc-100 rounded-full flex items-center gap-2 focus-within:bg-white focus-within:shadow-md focus-within:ring-1 focus-within:ring-blue-500 transall">
        <Search className="w-5 h-5 text-zinc-500" />
        <input
          type="text"
          placeholder="Search in Drive"
          className="bg-transparent border-none outline-none w-full text-zinc-800 placeholder:text-zinc-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 ml-6 text-zinc-600">
        <button className="p-2 hover:bg-zinc-100 rounded-full transall">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-zinc-100 rounded-full transall">
          <Settings className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 rounded-full bg-blue-600 flexc text-white font-medium text-sm ml-2.5">
          D
        </div>
      </div>
    </header>
  );
}
