"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { UploadCloud } from "lucide-react";
import { useFileStore } from "@/lib/store";
import { useDropzone } from "react-dropzone";

export function GlobalDropzone({ children }: { children: React.ReactNode }) {
  const addFile = useFileStore((state) => state.addFile);
  const isUploadModalOpen = useFileStore((state) => state.uploadModalOpen);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      addFile({
        name: file.name,
        size: file.size,
        type: file.type || "application/octet-stream",
      });
    });
  }, [addFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true, // Menghindari seluruh window memicu modal file upload kalo di klik
    noKeyboard: true,
    disabled: isUploadModalOpen, // Matikan dropzone global kalo modal UI lagi kebuka, mencegah duplikasi trigger drop event React
  });

  return (
    <div 
      {...getRootProps()}
      className="relative flex flex-1 h-full w-full overflow-hidden"
    >
      <input {...getInputProps()} />
      {children}

      <AnimatePresence>
        {isDragActive && (
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
