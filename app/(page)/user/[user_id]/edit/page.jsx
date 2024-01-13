// Next Auth
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// NextJS
import { redirect } from "next/navigation";

// Server Action
import { getUser } from "@/app/userActions";

// Component
import EditForm from "@/components/EditForm";
import BackButton from "@/components/BackButton";

const Page = async ({ params: { user_id }}) => {

    // Check if User logged in
    const session = await getServerSession(authOptions);
    if (!session) redirect('/');

    // If not the owner (cant edit)
    if (user_id !== session?.user?.user_id) redirect('/');

    const user = JSON.parse(JSON.stringify(await getUser(user_id)));

    return (
        <div className="text-textPrimary">
            <div className="flex justify-center min-h-[calc(100vh-5rem)]">
                <div className="max-w-[60rem] w-full flex flex-col px-3">

                    <div className="flex gap-3 items-center pt-10">
                        <BackButton />
                        <p className="text-2xl">Edit Profile</p>
                    </div>

                    <EditForm user={user}/>
                    
                </div>
            </div>
        </div>
    )
};

export default Page;