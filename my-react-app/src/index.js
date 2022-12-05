import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import './sass/App.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';


const LightTheme = React.lazy(() => import('./components/LightTheme'));
const DarkTheme = React.lazy(() => import('./components/DarkTheme'));

const ThemeSelector = ({children}) => {
  const theme = localStorage.getItem('theme') || window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
  localStorage.setItem('theme', theme)
  return(
    <React.Suspense fallback={<></>} >
      {theme === 'dark' && <DarkTheme />}
      {theme === 'light' && <LightTheme />}
      {children}
    </React.Suspense>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeSelector>
      <button onClick={() => {}}> Change Mode </button>
    <App />
    </ThemeSelector>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
