// Next Auth
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Component
import LandingPage from "@/components/LandingPage";
import HomePage from "@/components/HomePage";

const Page = async () => {

  // Check If User logged in
  const session = await getServerSession(authOptions);
    
    return (
        <>
            { session ? <HomePage /> : <LandingPage /> }
        </>
    )
};

export default Page;