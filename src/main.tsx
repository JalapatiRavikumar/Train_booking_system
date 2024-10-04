// Importing StrictMode from React to highlight potential problems in the application during development
import { StrictMode } from 'react';

// Importing createRoot from ReactDOM to create the root element for rendering the React application
import { createRoot } from 'react-dom/client';

// Importing the main App component, which will serve as the entry point of the application
import App from './App.tsx';

// Importing the global CSS file where Tailwind or other global styles are applied
import './index.css';

// Creating the root element by targeting the HTML element with the id 'root' in the DOM
// The '!' after getElementById asserts that this element is not null (TypeScript feature)
createRoot(document.getElementById('root')!).render(
  // Wrapping the main App component inside React's StrictMode
  // StrictMode helps to identify issues in the app during the development phase (such as unsafe lifecycle methods or deprecated features)
  <StrictMode>
    <App />
  </StrictMode>,
);
