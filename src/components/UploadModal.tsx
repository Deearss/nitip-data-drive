"use client";

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

export function UploadModal() {
  const [open, setOpen] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const addFile = useFileStore((state) => state.addFile);

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

        <div className="flexcc w-full p-8 border-2 border-dashed border-zinc-200 rounded-xl bg-zinc-50 flex-col gap-4 text-center mt-4">
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
                  Drag and drop features not available yet.
                </p>
                <p className="text-sm text-zinc-500 mt-1">
                  Click the button below to open file picker.
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
