# Frontend Architecture

## Component Hierarchy & Layout

- **`src/app/layout.tsx`**: Holds the root HTML/body and standard metadata. Wraps the whole app in `TooltipProvider` and potentially custom theme configurations.
- **`src/app/page.tsx`**: The main entry point (Dashboard/My Drive).

```
<AppLayout>
  <Sidebar>
    - Navigation Links
    - Storage Meter (dummy logic)
  </Sidebar>
  <MainContent>
    <Header>
      - Search Bar
      - User Actions
    </Header>
    <FileGridContainer>
      - <FileCard />
      - <FileCard />...
    </FileGridContainer>
  </MainContent>
</AppLayout>
```

## Data Flow (Zustand)

All dummy data state is stored via `useFileStore` (`src/lib/store.ts`):
- `files`: Array of file objects (id, name, type, size, uploadDate)
- `addFile(file)`: Logic to parse native File output and append.
- `deleteFile(id)`: Removes file from list.
- Configured with `persist` middleware binding data strictly to `localStorage`.

No backend API routes (`/api`) exist or are needed.
