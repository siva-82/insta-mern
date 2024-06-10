import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import store from './store';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'; 
import App from './App';
import Login from './Screens/LoginScreen';
import Register from './Screens/RegisterScreen';
import Home from './Screens/Home';
import PostUpload from './components/PostUpload';
import UpdatePost from './components/UpdatePost';


const router =createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/post' element={<PostUpload/>}></Route>
      <Route path='/updatePost/:id' element={<UpdatePost/>}></Route>
    </Route> 
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Provider store={store}>
 <React.StrictMode>

    <RouterProvider router={router} />
   
  </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
