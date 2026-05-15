import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { StoreProvider } from './context/StoreContext'
import { UserAuthProvider } from './context/UserAuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <StoreProvider>
        <UserAuthProvider>
          <App />
        </UserAuthProvider>
      </StoreProvider>
    </AuthProvider>
  </StrictMode>,
)
