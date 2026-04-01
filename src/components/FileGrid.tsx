"use client";

import { useFileStore } from "@/lib/store";
import { File, Image as ImageIcon, FileText, Video, Music, MoreVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function getFileIcon(type: string) {
  if (type.includes("image")) return ImageIcon;
  if (type.includes("video")) return Video;
  if (type.includes("audio")) return Music;
  if (type.includes("text") || type.includes("pdf")) return FileText;
  return File;
}

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function FileGrid() {
  const { files, deleteFile, searchQuery } = useFileStore();

  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (files.length === 0) {
    return (
      <div className="flexcc flex-1 h-full w-full text-zinc-500 gap-4 mt-20">
        <File className="w-16 h-16 text-zinc-300" />
        <p className="text-lg">No files here. Try uploading some dummy data!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6">
      {filteredFiles.map((file) => {
        const Icon = getFileIcon(file.type);
        const date = new Date(file.uploadedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        });

        return (
          <div
            key={file.id}
            className="group relative flex flex-col justify-between bg-white border border-zinc-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-md transall cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-zinc-100/80 rounded-lg text-blue-600 group-hover:bg-blue-50 group-hover:text-blue-700 transall">
                <Icon className="w-8 h-8" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger 
                  render={
                    <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transall focus-visible:opacity-100">
                      <MoreVertical className="w-4 h-4 text-zinc-500" />
                    </Button>
                  } 
                />
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="text-red-600 focus:bg-red-50 focus:text-red-700 cursor-pointer flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteFile(file.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex flex-col gap-0.5">
              <h3 className="font-semibold text-zinc-900 text-sm truncate" title={file.name}>
                {file.name}
              </h3>
              <p className="text-xs text-zinc-500">
                {formatBytes(file.size)} • {date}
              </p>
            </div>
          </div>
        );
      })}

      {filteredFiles.length === 0 && files.length > 0 && (
        <div className="col-span-full flexcc text-zinc-500 mt-10">
          <p>No files match &apos;{searchQuery}&apos;</p>
        </div>
      )}
    </div>
  );
}
