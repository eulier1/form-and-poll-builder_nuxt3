# [Poll & Form Builder](https://form-and-poll-builder-nuxt3.vercel.app/)

A Vue 3 and Nuxt application for creating and responding to polls and forms.


## Features

### Polls
https://github.com/user-attachments/assets/573b17c0-d335-4a92-8ebb-3b1d47c621e3


### Forms
https://github.com/user-attachments/assets/9052c54b-238f-408f-92a6-a86a715b50c4



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
│   │   └── PollResponses.vue
│   ├── forms/
│   │   ├── FormCreator.vue
│   │   └── FormDisplay.vue
│   │   └── FormResponses.vue
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

1. **State Management**: Pinia with Typescript to act as internal CRUD operations without backend. In real life, dynamic routing is prefered.
2. **Component Structure**: For consistency we prefer to follow the same folder structure convention.
3. **Typescript**: To easily visualize data flow.
4. **UI Framework**: Using Tailwind CSS for utility-first.
5. **Form Validation**: Client-side validation for required fields. In real world, backend validation is needed.
6. **Responsive Design**: Thanks to Tailwinds utilities.
7. **No-Layout Folder**: Since the app is pretty small, there is no need to complicate the development
8. **No-Dinamic Nested Navigation**: With no backend for this app, I prefer to use Pinia to act like one. In real world dynamic routing is needed to add a layer of security and modularity.
