import React from 'react';
import './index.module.css';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import BaseLayout from './components/BaseLayout';
import Dashboard from './pages/Dashboard';
import { getRecipesData } from './pages/Dashboard'
import Recipes from './pages/Recipes';
import MyPlan from './pages/MyPlan';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<BaseLayout />} errorElement={<ErrorPage />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/dashboard' element={<Dashboard />} loader={getRecipesData} />
            <Route path='recipes/:id' element={<Recipes />} />
            <Route path='plan' element={<MyPlan />} />
        </Route>
    )
);


const App = () => {
    return (
        <RouterProvider router={router} />
    );
}
export default App