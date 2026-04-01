import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { FileGrid } from "@/components/FileGrid";
import { UploadModal } from "@/components/UploadModal";
import { GlobalDropzone } from "@/components/GlobalDropzone";

export default function Home() {
  return (
    <div className="flex h-screen w-full bg-zinc-50 overflow-hidden">
      <Sidebar />
      <GlobalDropzone>
        <div className="flex-1 flex flex-col h-full w-full overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">My Drive</h1>
              <UploadModal />
            </div>
            <FileGrid />
          </main>
        </div>
      </GlobalDropzone>
    </div>
  );
}


