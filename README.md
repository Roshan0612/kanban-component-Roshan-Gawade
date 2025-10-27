# Kanban Board Component

Live Storybook: (deploy your Storybook and place link here)

## Installation

```bash
npm install
npm run storybook
```

## Architecture

This repository contains a reusable `KanbanBoard` component implemented in React + TypeScript with Tailwind CSS. The component focuses on accessibility, performance, and modular architecture.

Key folders:
- `src/components/KanbanBoard` - main component, column and card components, modal and stories
- `src/components/primitives` - small UI primitives used by component
- `src/hooks` - custom hooks (drag-and-drop, board state)
- `src/utils` - small helpers for tasks/columns

## Features
- Drag-and-drop using a custom HTML5 DnD wrapper
- Accessible card and column semantics
- Storybook stories demonstrating default/empty/large/mobile/interactive views

## Next steps / Improvements
- Add keyboard drag support (Space + arrows)
- Add virtualization for very large columns
- Add animations with `framer-motion` (optional)

## Contact
roshangawade160@gmail.com
