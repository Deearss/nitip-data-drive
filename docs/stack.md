# Tech Stack & Why

This application (`nitip-data-drive`) is built exclusively as a Frontend MVP, focusing on state simulation without a backend or persistent database.

## Stack 

1. **Framework**: Next.js (App Router, TypeScript)
    - *Why*: Strict modern standard, optimal file-based routing.
2. **Styling**: Tailwind CSS + `clsx` + `tailwind-merge`
    - *Why*: Rapid UI iteration, standard utility convention, `clsx` manages responsive breakpoints clearly.
3. **UI Components**: Shadcn/UI
    - *Why*: Maintainable, beautiful, unstyled primitives copied directly into source code for full customizability.
4. **State Management**: Zustand (+ persist middleware)
    - *Why*: Simple API compared to Redux, out-of-the-box localStorage simulation that meets the core "no external DB" requirement.
5. **Icons & Animations**: `lucide-react`, `react-icons`, `motion` (Framer Motion)
    - *Why*: Premium feel, fluid micro-interactions, robust iconography.
