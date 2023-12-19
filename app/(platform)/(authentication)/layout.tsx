import { HomepageNavbar } from '@/components/Navbar'
import React from 'react'

const Layout = ({children} :{children:React.ReactNode}) => {
  return (
    <>
        <HomepageNavbar />
        {children}
    </>
  )
}

export default Layout