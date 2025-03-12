import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Login from './pages/Login'
import Register from './pages/Register.tsx'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard.tsx'
import LayoutAdmin from './components/LayoutAdmin.tsx'
import LegalesMentions from './pages/LegalesMentions.tsx'
import CGU from './pages/CGU.tsx'
import Contact from './pages/Contact.tsx'
import { AuthProvider } from './store/AuthContext.tsx'
import PrivateRoutes from './components/PrivateRoutes.tsx'
import SelectedTheme from './pages/SelectedTheme.tsx'
import Profile from './pages/Profile.tsx'
import CreateCalendar from './pages/CreateCalendar.tsx'
import PageCalendar from './pages/PageCalendar.tsx'

const root = document.getElementById('root')

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/"
                 element={<App/>}/>
          <Route path="/login"
                 element={<Login/>}/>
          <Route path="/register"
                 element={<Register/>}/>
          <Route path="/legale-mentions"
                 element={<LegalesMentions/>}/>
          <Route path="/cgu"
                 element={<CGU/>}/>
          <Route path="/contact"
                 element={<Contact/>}/>
          <Route path="/calendar/:id"
                 element={<PageCalendar/>}/>
        </Route>
        <Route element={<PrivateRoutes/>}>
          <Route element={<LayoutAdmin/>}>
            <Route path="/dashboard"
                   element={<Dashboard/>}/>
            <Route path="/selected-theme"
                   element={<SelectedTheme/>}/>
            <Route path="/create-calendar"
                   element={<CreateCalendar/>}/>
            <Route path="/profile"
                   element={<Profile/>}/>
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>,
)
