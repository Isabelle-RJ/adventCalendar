import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App'
import Login from './pages/Login'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard.tsx'
import LayoutAdmin from './components/LayoutAdmin.tsx'

const root = document.getElementById('root')

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/"
               element={<App/>}/>
        <Route path="/login"
               element={<Login/>}/>
      </Route>
      <Route element={<LayoutAdmin/>}>
        <Route path="/dashboard"
               element={<Dashboard/>}/>
      </Route>
    </Routes>
  </BrowserRouter>,
)
