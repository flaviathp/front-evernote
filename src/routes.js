import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import NotesIndex from './pages/notes/index';
import UserEdit from './pages/users/edit';
import PrivateRoute from './components/auth/privateRoute';

const Router = () => (
    <>
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Home/>} />
                <Route exact path='/login' element={<Login/>} />
                <Route exact path='/register' element={<Register/>} />
                <Route exact path='/notes' element= {<PrivateRoute> <NotesIndex/> </PrivateRoute>}/>
                <Route exact path='/users/edit' element={<UserEdit/>} />
            </Routes>
        </BrowserRouter>
    </>
)

export default Router;