import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout(props) {
  const {children}= props
  return (
        <div className='flex flex-col min-h-screen relative bg-gray-950 text-white'>
        <Navbar />
        <main className='flex-1 flex flex-col p-4'>
           {children}
        </main>
         <Footer/>
        </div>
  )
}
