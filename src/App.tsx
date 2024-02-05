import { lazy, Suspense } from 'react'
// import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from './layout/Layout';
const Home = lazy(() => import('./pages/home/Home'));
const CarList = lazy(() => import('./pages/carList/CarList'));

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Layout />}>
    <Route index element={<Navigate to="home" replace />} />
    <Route
            path="home"
            element={
              <Suspense fallback={<>...</>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="list"
            element={
              <Suspense fallback={<>...</>}>
                <CarList />
              </Suspense>
            }
          />
    </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
