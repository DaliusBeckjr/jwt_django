import { 
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom'
import './App.css';

//Layouts
import RootLayout from './layouts/RootLayout';

//context
import { AuthProvider } from './context/AuthContext';

// pages
import  HomePage   from './pages/HomePage';
import LoginPage from './pages/LoginPage';

//utils
import PrivateRoutes from './utils/PrivateRoutes';

// router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route element={<PrivateRoutes />}>
        <Route index element={ <HomePage />} />
      </Route>

      <Route path="/login" element={ <LoginPage />} />
    </Route>
  )
)

function App() {

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App;
