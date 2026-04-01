"use client";

import { useFileStore } from "@/lib/store";
import { File, Image as ImageIcon, FileText, Video, Music, MoreVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuShortcut
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect } from "react";
import { SHORTCUTS } from "@/lib/shortcuts";
import clsx from "clsx";

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
  const { files, deleteFile, searchQuery, selectedFileId, setSelectedFileId, deleteModalOpen, setDeleteModalOpen } = useFileStore();

  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing
      const activeElement = document.activeElement;
      if (activeElement && ["INPUT", "TEXTAREA"].includes(activeElement.tagName)) return;

      if (deleteModalOpen) {
        if (SHORTCUTS.CONFIRM_MODAL.includes(e.key)) {
          e.preventDefault();
          if (selectedFileId) {
            deleteFile(selectedFileId);
            setSelectedFileId(null);
          }
          setDeleteModalOpen(false);
        } else if (SHORTCUTS.CANCEL_MODAL.includes(e.key)) {
          e.preventDefault();
          setDeleteModalOpen(false);
        }
        return;
      }

      if (selectedFileId && !deleteModalOpen) {
        if (SHORTCUTS.DELETE_FILE.includes(e.key)) {
          e.preventDefault();
          setDeleteModalOpen(true);
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [deleteModalOpen, selectedFileId, deleteFile, setDeleteModalOpen, setSelectedFileId]);

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
            onClick={() => setSelectedFileId(file.id)}
            className={clsx(
              "group relative flex flex-col justify-between bg-white border rounded-xl p-4 hover:border-blue-400 hover:shadow-md transall cursor-pointer",
              selectedFileId === file.id ? "border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/20" : "border-zinc-200"
            )}
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
                    className="text-red-600 focus:bg-red-50 focus:text-red-700 cursor-pointer flex items-center justify-between gap-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFileId(file.id);
                      setDeleteModalOpen(true);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </div>
                    <DropdownMenuShortcut className="text-red-400">Del</DropdownMenuShortcut>
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this file? This action cannot be undone.
              <br/>
              <span className="inline-block mt-3 text-xs font-medium bg-zinc-100 px-2 py-2 rounded text-zinc-600 border border-zinc-200">
                Hint: Press <strong>Enter</strong> to confirm, or <strong>Esc</strong> to cancel.
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => {
              if (selectedFileId) {
                deleteFile(selectedFileId);
                setSelectedFileId(null);
              }
              setDeleteModalOpen(false);
            }}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
