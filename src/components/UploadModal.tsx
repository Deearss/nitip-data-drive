"use client";

import * as React from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFileStore } from "@/lib/store";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";

export function UploadModal() {
  const open = useFileStore((state) => state.uploadModalOpen);
  const setOpen = useFileStore((state) => state.setUploadModalOpen);
  const [uploading, setUploading] = React.useState(false);
  const addFile = useFileStore((state) => state.addFile);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles || acceptedFiles.length === 0) return;

    setUploading(true);

    // Simulate upload delay for UI premium feel
    setTimeout(() => {
      acceptedFiles.forEach((file) => {
        addFile({
          name: file.name,
          size: file.size,
          type: file.type || "application/octet-stream",
        });
      });
      setUploading(false);
      setOpen(false); // close modal when done
    }, 1500);
  }, [addFile, setOpen]);

  // Kita biarkan user bisa klik untuk upload via tombolnya aja, biar nggk bentrok kalo nyoba ngetik
  const { getRootProps, getInputProps, isDragActive, open: openFileDialog } = useDropzone({
    onDrop,
    noClick: true, 
  });

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
          {...getRootProps()}
          className={clsx(
            "flexcc w-full p-8 border-2 border-dashed rounded-xl flex-col gap-4 text-center mt-4 transall",
            isDragActive ? "border-blue-500 bg-blue-50" : "border-zinc-200 bg-zinc-50"
          )}
        >
          <input {...getInputProps()} />
          
          {uploading ? (
            <div className="flexcc gap-4 animate-pulse">
              <div className="size-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-zinc-600 font-medium">Processing files...</p>
            </div>
          ) : (
            <>
              <div className="flexc size-16 bg-blue-100 rounded-full text-blue-600 mb-2">
                <UploadCloud className="size-8" />
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
                onClick={openFileDialog}
                variant="outline"
                className="mt-2"
              >
                Browse Files
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
