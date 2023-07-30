import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'; // or HashRouter


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* or HashRouter */}
      <App />
    </BrowserRouter> {/* or HashRouter */}
  </React.StrictMode>,
)
