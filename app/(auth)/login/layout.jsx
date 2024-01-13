// Next Auth
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// NextJS
import { redirect } from "next/navigation";

const Layout = async ({children}) => {

  // Check User Logged in
  const session = await getServerSession(authOptions);
  if (session) redirect('/');

  return (
    <div>{children}</div>
  )
}

export default Layout