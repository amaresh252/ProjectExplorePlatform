import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import Profile from './pages/Profile';

const router=createBrowserRouter([

{
  path:'/',
  element:(
   <Login/>
  )
},
{
  path:'/register',
  element:(
   <Register/>
  )
},
{
  path:'/home',
  element:(
   <Home/>
  )
},
{
  path:'/profile',
  element:(
   <Profile/>
  )
},

])
function App() {
  
  return (
    <RouterProvider router={router}/>
  );
}


export default App;
