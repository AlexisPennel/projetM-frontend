import React from 'react';
import './index.module.css';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import BaseLayout from './components/BaseLayout';
import Dashboard from './pages/Dashboard';
import Recipes from './pages/Recipes';
import CreatePlan from './pages/CreatePlan';
import MyPlan from './pages/MyPlan';
import ShoppingList from './pages/ShoppingList';


const token = localStorage.getItem('tokenMFP');

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<BaseLayout />} errorElement={<ErrorPage />}>
            <Route path='/' element={<HomePage />} />
            <Route path='dashboard' element={token === null ? <Navigate to={'/'} /> : <Dashboard />} />
            <Route path='recipes/:id' element={token === null ? <Navigate to={'/'} /> : <Recipes />} />
            <Route path='plan/' element={token === null ? <Navigate to={'/'} /> : <MyPlan />} />
            <Route path='plan/createplan' element={token === null ? <Navigate to={'/'} /> : <CreatePlan />} />
            <Route path='shoppinglist' element={token === null ? <Navigate to={'/'} /> : <ShoppingList />} />
        </Route>
    )
);


const App = () => {
    return (
        <RouterProvider router={router} />
    );
}
export default App