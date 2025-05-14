# Poll & Form Builder

A Vue 3 and Nuxt application for creating and responding to polls and forms.

## Features

### Polls
- Create single-question polls with multiple choice options
- Respond to polls by selecting an option
- View poll results with vote counts and percentages

### Forms
- Create forms with multiple questions
- Support for different question types:
  - Short answer (text input)
  - Long answer (textarea)
  - Number input
  - Radio buttons (single choice)
- Mark questions as required or optional
- Add placeholders to form questions
- View form responses

## Tech Stack

- Vue 3 with Composition API
- Nuxt 3
- TypeScript
- Pinia for state management
- Tailwind CSS for styling
- Nuxt UI for UI components

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
├── components/
│   ├── polls/
│   │   ├── PollCreator.vue
│   │   └── PollDisplay.vue
│   ├── forms/
│   │   ├── FormCreator.vue
│   │   └── FormDisplay.vue
│   └── ui/
│       └── BaseInput.vue
├── stores/
│   ├── polls.ts
│   └── forms.ts
├── types/
│   └── index.ts
└── pages/
    ├── index.vue
    ├── polls/
    │   └── index.vue
    └── forms/
        └── index.vue
```

## Design Decisions

1. **State Management**: Using Pinia for its simplicity and TypeScript support.
2. **Component Structure**: Components are organized by feature (polls/forms) and reusability (ui).
3. **Type Safety**: Full TypeScript support with strict mode enabled.
4. **UI Framework**: Using Tailwind CSS for utility-first styling and Nuxt UI for pre-built components.
5. **Form Validation**: Client-side validation for required fields.
6. **Responsive Design**: Mobile-first approach with responsive layouts.
7. **No-Layout Folder**: Since the app is pretty small, there is no need to complicate the development

## Future Improvements

1. Add form response viewing interface
2. Implement data persistence
3. Add user authentication
4. Add form templates
5. Add form sharing functionality
6. Add form analytics
