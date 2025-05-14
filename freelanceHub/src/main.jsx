import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from './components/ui/provider'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './Store/store'
import { AuthProvider } from './Context/AuthContext'
// import { JobProvider } from './Context/JobContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <BrowserRouter>
    <ReduxProvider store={store}>
    <AuthProvider>
    <Provider>
    <App />
    </Provider>
    </AuthProvider>
    </ReduxProvider>
    </BrowserRouter>
    
  </StrictMode>,
)
