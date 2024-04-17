import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Rendér hovedkomponenten i HTML-rodelementet med id 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode anvendes til at identificere usikre praksisser og advare mod dem.
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
