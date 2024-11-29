import Login from './pages/Login'
import Home from './pages/Home'
import Reports from './pages/Reports'
import ErrorPage from './pages/ErrorPage'
import Gestion from './pages/GestionUsuarios'
import Ayuda from './pages/Ayuda'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: < ErrorPage/>, 
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: 'Home',
        element: <Home />
      },
      {
        path: 'Reports',
        element: <Reports />
      },
      {
        path: 'GestionUsuarios',
        element: <Gestion />
      }
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App