import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Login from './pages/Login'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard.tsx'
import LayoutAdmin from './components/LayoutAdmin.tsx'
import LegalesMentions from './pages/LegalesMentions.tsx'
import CGU from './pages/CGU.tsx'
import Contact from './pages/Contact.tsx'
import { AuthProvider } from './store/AuthContext.tsx'
import PrivateRoutes from './components/PrivateRoutes.tsx'

const root = document.getElementById('root')

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"
            element={<App />} />
          <Route path="/login"
            element={<Login />} />
          <Route path="/legale-mentions"
            element={<LegalesMentions />} />
          <Route path="/cgu"
            element={<CGU />} />
          <Route path="/contact"
            element={<Contact />} />
        </Route>
        <Route element={<PrivateRoutes />} >
          <Route element={<LayoutAdmin />}>
            <Route path="/dashboard"
              element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>,
)
