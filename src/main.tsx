import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/instrument-sans'
import '@fontsource/instrument-serif'
import '@fontsource/instrument-serif/400-italic.css'
import './styles/index.css'
import App from './App'
import { ThemeProvider } from './lib/theme'
import { initAnalytics } from './lib/analytics'
import { injectBaseJsonLd } from './lib/seo'

initAnalytics()
injectBaseJsonLd()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
