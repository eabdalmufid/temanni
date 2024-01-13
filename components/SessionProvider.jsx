'use client'
 
import { SessionProvider } from 'next-auth/react';
 
const Provider = ({ children, session }) => {

  // Use of the <SessionProvider> is mandatory to allow components that call
  // `useSession()` anywhere in your application to access the `session` object.
  
  return (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
  )
};

export default Provider; 