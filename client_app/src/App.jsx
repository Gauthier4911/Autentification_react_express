import React from 'react'
import {Outlet} from "react-router-dom";
import {Toaster} from "sonner";
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query';
  
const queryClient = new QueryClient()

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster position="top-center" expand={true}/>
            <Outlet />
        </QueryClientProvider>
    )
}