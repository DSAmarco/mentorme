import React from "react"
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
// import Featured from "./components/featured/Featured"
import Home from "./pages/home/Home"
import Gigs from "./pages/gigs/Gigs"
import Gig from "./pages/gig/Gig"
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Add from "./pages/add/Add"
import Orders from "./pages/orders/Orders"
import Messages from "./pages/messages/Messages" 
import Message from "./pages/message/Message" 
import MyGigs from "./pages/myGigs/MyGigs"

import "./app.scss"

import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom"

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query"

function App() {

  const queryClient = new QueryClient();

  const Layout = ()=>{
    return (
      <div className="app">
        <QueryClientProvider client ={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    )
  }

	const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
    children:[
      {
        path:"/",
        element:<Home />
      },
      {
        path:"/gigs",
        element:<Gigs />
      },
      {
        path:"/gig/:id",
        element:<Gig />
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path:"/orders",
        element:<Orders />
      },
      {
        path:"/mygigs",
        element:<MyGigs />
      },
      {
        path:"/add",
        element:<Add />
      },
      {
        path:"/messages",
        element:<Messages />
      },
      {
        path:"/message/:id",
        element:<Message />
      },
    ]
	},
  ]);


  return (
    <div><RouterProvider router={router} /></div>
  )
}

export default App