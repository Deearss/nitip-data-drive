import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface DriveFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: number;
}

interface FileStoreState {
  files: DriveFile[];
  addFile: (file: Omit<DriveFile, "id" | "uploadedAt">) => void;
  deleteFile: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useFileStore = create<FileStoreState>()(
  persist(
    (set) => ({
      files: [],
      addFile: (fileData) =>
        set((state) => ({
          files: [
            ...state.files,
            {
              ...fileData,
              id: crypto.randomUUID(),
              uploadedAt: Date.now(),
            },
          ],
        })),
      deleteFile: (id) =>
        set((state) => ({
          files: state.files.filter((f) => f.id !== id),
        })),
      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: "nitip-data-drive-storage", // nama key di localStorage
    }
  )
);
