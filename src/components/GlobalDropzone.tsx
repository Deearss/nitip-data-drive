"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { UploadCloud } from "lucide-react";
import { useFileStore } from "@/lib/store";

export function GlobalDropzone({ children }: { children: React.ReactNode }) {
  const [isDragging, setIsDragging] = React.useState(false);
  const dragCounter = React.useRef(0);
  const addFile = useFileStore((state) => state.addFile);

  const handleDragEnter = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      Array.from(e.dataTransfer.files).forEach((file) => {
        addFile({
          name: file.name,
          size: file.size,
          type: file.type || "application/octet-stream",
        });
      });
    }
  }, [addFile]);

  React.useEffect(() => {
    // Prevent browser from opening dragged files when dropped outside the dropzone somehow
    const preventDefault = (e: Event) => e.preventDefault();
    window.addEventListener("dragover", preventDefault);
    window.addEventListener("drop", preventDefault);
    return () => {
      window.removeEventListener("dragover", preventDefault);
      window.removeEventListener("drop", preventDefault);
    };
  }, []);

  return (
    <div 
      className="relative flex flex-1 h-full w-full overflow-hidden"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children}

      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-100 flexcc bg-zinc-900/40 backdrop-blur-sm pointer-events-none"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="flexcc p-10 bg-white/95 border-2 border-dashed border-blue-500 rounded-3xl shadow-2xl text-blue-600 gap-6 w-[80%] max-w-lg"
            >
              <div className="flexc size-24 bg-blue-100 rounded-full animate-bounce">
                <UploadCloud className="size-12" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-zinc-900">Drop your files here</h3>
                <p className="text-zinc-500 mt-2 font-medium">Any kind of file is accepted. We&apos;ll dummy-upload it instantly to your Drive.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
