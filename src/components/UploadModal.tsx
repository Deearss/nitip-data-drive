"use client";

import * as React from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFileStore } from "@/lib/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import clsx from "clsx";

export function UploadModal() {
  const [open, setOpen] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const dragCounter = React.useRef(0);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const addFile = useFileStore((state) => state.addFile);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    dragCounter.current = 0;

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    // Simulate upload delay for UI premium feel
    setTimeout(() => {
      Array.from(files).forEach((file) => {
        addFile({
          name: file.name,
          size: file.size,
          type: file.type || "application/octet-stream",
        });
      });
      setUploading(false);
      setOpen(false);
    }, 1500);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    // Simulate upload delay for UI premium feel
    setTimeout(() => {
      Array.from(files).forEach((file) => {
        addFile({
          name: file.name,
          size: file.size,
          type: file.type || "application/octet-stream",
        });
      });
      setUploading(false);
      setOpen(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="gap-2 shadow-md hover:shadow-lg transall">
            <UploadCloud className="w-4 h-4" />
            New File
          </Button>
        }
      />
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>
            Select a file to sync to your local drive. This is just a dummy
            simulation.
          </DialogDescription>
        </DialogHeader>

        <div 
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={clsx(
            "flexcc w-full p-8 border-2 border-dashed rounded-xl flex-col gap-4 text-center mt-4 transall",
            isDragOver ? "border-blue-500 bg-blue-50" : "border-zinc-200 bg-zinc-50"
          )}
        >
          {uploading ? (
            <div className="flexcc gap-4 animate-pulse">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium text-blue-600">Uploading...</p>
            </div>
          ) : (
            <>
              <div className="flexc size-16 bg-blue-100 rounded-full text-blue-600 mb-2">
                <UploadCloud className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900">
                  Drag and drop your files here
                </p>
                <p className="text-sm text-zinc-500 mt-1">
                  Or click the button below to open file picker
                </p>
              </div>
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="mt-2"
              >
                Browse Files
              </Button>
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
              />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
