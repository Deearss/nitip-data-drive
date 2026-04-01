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
  uploadModalOpen: boolean;
  setUploadModalOpen: (open: boolean) => void;
  selectedFileId: string | null;
  setSelectedFileId: (id: string | null) => void;
  deleteModalOpen: boolean;
  setDeleteModalOpen: (open: boolean) => void;
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
      uploadModalOpen: false,
      setUploadModalOpen: (open) => set({ uploadModalOpen: open }),
      selectedFileId: null,
      setSelectedFileId: (id) => set({ selectedFileId: id }),
      deleteModalOpen: false,
      setDeleteModalOpen: (open) => set({ deleteModalOpen: open }),
    }),
    {
      name: "nitip-data-drive-storage", // nama key di localStorage
      partialize: (state) => ({ files: state.files }), // Cuma persist files aja biar state UI nggak nyangku pass direfresh
    }
  )
);
