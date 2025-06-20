# Testing Auth - Frontend

A React application bootstrapped with Vite for fast development and production builds. This project provides a modern authentication UI that integrates with a backend API. It uses TailwindCSS, DaisyUI, and Zustand for state management.

## Features

- **Fast Development:** Powered by Vite with Hot Module Replacement.
- **Modern UI:** Built with React, TailwindCSS, and DaisyUI.
- **Global State Management:** Uses Zustand for managing authentication and theme states.
- **Production Ready:** Easily build and deploy your optimized application.

## Technologies

- [React](https://reactjs.org)
- [Vite](https://vitejs.dev)
- [TailwindCSS](https://tailwindcss.com)
- [DaisyUI](https://daisyui.com)
- [Zustand](https://github.com/pmndrs/zustand)

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Development Mode:**

   Start the development server with:

   ```bash
   npm run dev
   ```

   The app will be served at [http://localhost:5173](http://localhost:5173).

3. **Linting:**

   Run ESLint to check code quality:

   ```bash
   npm run lint
   ```

## Building for Production

To create an optimized production build:

```bash
npm run build
```

A static build will be generated in the `dist` directory. You can preview the production build locally with:

```bash
npm run preview
```

## Deployment

The production build can be deployed to any static hosting provider (e.g., Netlify, Vercel, GitHub Pages). Ensure that your production API endpoints are correctly configured (see `src/lib/axios.js`).

## Environment Variables

Configure environment variables as needed in a `.env` file at the root of the project. For example:

```
VITE_API_URL=https://your-production-api.com/api
```

## License

This project is open-source under the [MIT License](LICENSE).

Happy Coding!