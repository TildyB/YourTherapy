import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './App.css'
import Home from './pages/Home'
import PsychoCallback from './pages/PsychoCallback'
import ClientCallback from "./pages/ClientCallback"
import PsychoDashboard from "./pages/PsychoDashboard"
import PsychoAllClients from "./pages/PsychoAllClients"
import ClientDashboard from "./pages/ClientDashboard"
import Protected from "./UtilComponents/Protected"
import MenuBar from "./UtilComponents/MenuBar"
import { ChakraProvider } from '@chakra-ui/react'
import { UserContext } from "./context/UserContext"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import { useState,useContext } from "react"


function App() {
  
  const {isLoggedIn} = useContext(UserContext)
  return (
      <ChakraProvider>
        <BrowserRouter>
        <MenuBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/psychocallback" element={<PsychoCallback />} />
            <Route path="/clientcallback" element={<ClientCallback />} />
            <Route path="/psychoallclients" element={
            <Protected isSignedIn={isLoggedIn}>
            <PsychoAllClients />
            </Protected>
            }  />
            <Route path="/psychodashboard" element={
              <Protected isSignedIn={isLoggedIn}>
                <PsychoDashboard />
              </Protected>
            } />
            <Route path="/clientdashboard" element={
              <Protected isSignedIn={isLoggedIn}>
                <ClientDashboard />
              </Protected>
            } />
          </ Routes>
        </BrowserRouter>
      </ChakraProvider>
  )
}

export default App
