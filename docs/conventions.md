# Coding Conventions

## Naming

- **Folders/Components**: PascalCase for custom UI components (`/src/components/MyComponent.tsx`). Flat or feature-based structure within `/components`.
- **Functions/Hooks**: camelCase (`getFileName()`, `useFileStore`).
- **Styles**: All styling MUST use Tailwind classes.

## Styling Rules

1. Always use `clsx` inside responsive and interactive classes. Base/Desktop configurations appear as the first parameter, max-md/max-sm adjustments logically follow.
2. Rely mostly on Shadcn UI unstyled primitives over creating massive raw Tailwind elements for generic forms (inputs, buttons).
3. Do NOT use placeholder arbitrary pixels (`w-[314px]`). Rely on preset sizing steps or flex proportions.

## Custom Global Classes

Use the custom utilities mapped in `@layer utilities` inside `globals.css`:
- `.flexc`: Centered flex row
- `.flexcc`: Centered flex col
- `.transall`: Standard easing transition
- `.transcenter`: Fixed positioning true center
- `.atranscenter`: Absolute positioning true center
