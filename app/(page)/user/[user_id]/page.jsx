// Next Auth
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Server Actions
import { getUser } from "@/app/userActions";

// NextJS
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

// Component
import BackButton from "@/components/BackButton";

const Page = async ({ params: { user_id }}) => {

    // Check User Session (If not logged in, redirect home)
    const session = await getServerSession(authOptions);
    if (!session) redirect('/');

    // Get User Profile
    const user = await getUser(user_id);
    if (!user) redirect('/');

    // Check the Owner of user profile
    const owner = session?.user?.user_id === user_id;

    // Check If user is hidden
    if (!owner && !user?.status) redirect('/');

    // Joined Since
    const joinedSince = new Date(user?.created_at);
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][joinedSince.getMonth()];
    const year = joinedSince.getFullYear();

    return (
        <div className="text-textPrimary">

            <div className="flex justify-center min-h-[calc(100vh-5rem)] break-all">
                <div className="max-w-[60rem] w-full flex flex-col px-3">
                    <div className="flex items-center justify-between pt-10">
                        <div className="flex gap-3 items-center">
                            <BackButton />
                            <p className="text-2xl">Profile</p>
                        </div>
                        { owner && <Link href={`/user/${user?.user_id}/edit`} className="underline hover:text-textSecondary">Edit Profile</Link>}
                    </div>

                    <div className="flex justify-between items-center pt-10">
                        <div className="relative">
                            <Image src={`${user?.profile ? user.profile : "/assets/images/profile.svg"}`} width={50} height={50} className="rounded-full w-28 aspect-square md:w-32 border border-baseSecondary" alt="profile" referrerPolicy="no-referrer"/>
                            { user?.is_verified && 
                                <div className="tooltip tooltip-right absolute right-0 bottom-0" data-tip="User Verified">
                                    <Image src={"/assets/icons/verified.svg"} width={50} height={50} className="w-10 " alt="verified"/>
                                </div>
                            }
                        </div>
                        <div className="flex flex-col text-end">
                            {/* Put Something Here Maybe So not empty */}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 pt-5">
                        <h2 className="text-2xl font-medium">{user?.username}</h2>
                        {/* { user?.is_verified && <Image src={"/assets/icons/verified.svg"} width={50} height={50} className="w-5" alt="verified"/>} */}
                    </div>

                    { user?.sex !== 0 &&
                        <p className={`pt-2 text-xl font-medium ${user?.sex === 1 ? "text-blue-500" : "text-pink-500"}`}>{user?.sex === 1 ? "Male" : "Female"}, {user?.age}</p>
                    }

                    <div className="pt-10 flex flex-col gap-2">
                        <p className="font-bold text-textSecondary">Joined Since</p>
                        <p>{`${month}, ${year}`}</p>
                    </div>

                    { user?.title && 
                        <div className="pt-5 flex flex-col gap-2">
                            <p className="font-bold text-textSecondary">Connect With Me</p>
                            <Link href={user?.contact} className="text-blue-400">{user?.contact}</Link>
                        </div>
                    }

                    { user?.title && 
                        <div className="pt-5 flex flex-col gap-2">
                            <p className="font-bold text-textSecondary">Title</p>
                            <p>{user?.title}</p>
                        </div>
                    }

                    { user?.description && 
                        <div className="pt-5 flex flex-col gap-2">
                            <p className="font-bold text-textSecondary">Description</p>
                            <p>{user?.description}</p>
                        </div>
                    }

                    { owner && 
                        <div className="pt-5 flex flex-col gap-2">
                            <p className="font-bold text-textSecondary">Status</p>
                            <p>{user?.status ? "Actively Looking" : "Hidden Profile"}</p>
                        </div>
                    }

                    { user?.tag && 
                        <div className="pt-5 flex flex-col gap-2 mb-20">
                            <p className="font-bold text-textSecondary">Tag</p>
                            <p className="bg-accent rounded-xl w-fit px-4 text-baseSecondary">{user?.tag}</p>
                        </div>
                    }
                </div>
            </div>

        </div>
    )
};

export default Page;