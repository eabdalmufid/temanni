// Next Auth
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Server Action
import { getUser } from "../userActions";

// Component
import Navbar from "@/components/Navbar";

const Layout = async ({ children }) => {

  // Check User Session (Get User Data from DB)
  const session = await getServerSession(authOptions);
  const user = JSON.parse(JSON.stringify(await getUser(session?.user?.user_id)));

  return (
    <>
      <Navbar user={user} />

      <section className="bg-basePrimary pt-20 font-poppins">
        {children}
      </section>

    </>
  );
};

export default Layout;
