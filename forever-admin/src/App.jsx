import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { lazy, Suspense, useContext } from "react";
import { Auth } from './context/AuthProvider'
import LoadingSpinner from './components/LoadingSpinner'

const Add = lazy(() => import('./pages/Add'))
const List = lazy(() => import('./pages/List'))
const Orders = lazy(() => import('./pages/Orders'))
const Login = lazy(() => import('./pages/Login'))

function App() {
  const { token } = useContext(Auth)

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="toast-container"
      />
      {
        token === "" ? <Login /> : (
          <>
            <Navbar />
            <hr className="text-gray-300" />
            <div className="flex w-full">
              <Sidebar />
              <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<List />} />
                    <Route path="/add" element={<Add />} />
                    <Route path="/order" element={<Orders />} />
                  </Routes>
                </Suspense>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default App
