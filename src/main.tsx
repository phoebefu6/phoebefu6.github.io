import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Note: StrictMode is intentionally off - framer-motion's AnimatePresence exit
// unmount is unreliable under StrictMode double-invocation (modal stays mounted
// at opacity 0 and blocks clicks).

// ?flat=1 - capture helper: collapses the full-height hero so a single tall
// headless screenshot shows every section (visual QA only, no user impact).
if (new URLSearchParams(window.location.search).has('flat')) {
  document.body.classList.add('capture-flat')
}

createRoot(document.getElementById('root')!).render(<App />)
