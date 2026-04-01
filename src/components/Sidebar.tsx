"use client";

import { Cloud, HardDrive, Clock, Trash2 } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useFileStore } from "@/lib/store";

const navigation = [
  { name: "My Drive", href: "/", icon: HardDrive },
  { name: "Recent", href: "#", icon: Clock },
  { name: "Trash", href: "#", icon: Trash2 },
];

export function Sidebar() {
  const pathname = usePathname();
  const files = useFileStore((state) => state.files);

  // 1 GB Limit in bytes
  const limitBytes = 1024 * 1024 * 1024;
  const totalBytes = files.reduce((acc, file) => acc + file.size, 0);
  const percentage = Math.min((totalBytes / limitBytes) * 100, 100).toFixed(1);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className={clsx(
      "w-64 border-r border-zinc-200 bg-zinc-50/50 flex flex-col pt-4 pb-6",
      "max-md:hidden" // Sembunyikan di mobile dulu untuk MVP
    )}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 mb-8">
        <div className="flexc w-10 h-10 rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/20">
          <Cloud className="w-5 h-5" />
        </div>
        <span className="font-semibold text-lg tracking-tight">Nitip Data</span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transall",
                isActive 
                  ? "bg-blue-100/50 text-blue-700" 
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
              )}
            >
              <item.icon className={clsx("w-5 h-5", isActive ? "text-blue-600" : "text-zinc-400")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Storage Dummy Meter */}
      <div className="px-6 mt-8">
        <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 mb-2">
          <span>Storage</span>
          <span suppressHydrationWarning>{percentage}%</span>
        </div>
        <div className="h-1.5 w-full bg-zinc-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 rounded-full transall duration-500" 
            style={{ width: `${percentage}%` }} 
            suppressHydrationWarning
          />
        </div>
        <p className="text-xs text-zinc-500 mt-2" suppressHydrationWarning>
          {formatBytes(totalBytes)} of 1 GB used
        </p>
      </div>
    </div>
  );
}
