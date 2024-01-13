import Image from "next/image";
import Link from "next/link";

const CardList = ({ users }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-between gap-5">
        { users.map((user) => (
            <div key={user?.user_id} className="flex flex-col min-h- rounded-lg bg-baseSecondary p-3 break-words">

                {/* Profile, Username, Age, Sex, Verified */}
                <div className="flex gap-3 items-center overflow-hidden">
                    <Image src={`${user?.profile ? user?.profile : "/assets/images/profile.svg"}`} alt="profile" width={20} height={20} quality={50} className="rounded-full aspect-square w-12" referrerPolicy="no-referrer"/>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                        <p className="font-medium line-clamp-1 max-w-40">{user?.username}</p>
                        { user?.is_verified && <Image src={"/assets/icons/verified.svg"} width={50} height={50} className="w-4" alt="verified"/>}
                        </div>
                        <p className={` ${user?.sex === 1 ? "text-blue-500" : "text-pink-500"}`}>{user?.sex === 1 ? "Male" : "Female"}, {user?.age}</p>
                    </div>
                </div>

                {/* Title Description */}
                <Link href={`/user/${user?.user_id}`} className="flex flex-col gap-2 pt-5">
                    <h4 className="line-clamp-1 font-medium">{user?.title}</h4>
                    <p className="line-clamp-4 text-sm text-textSecondary">{user?.description}</p>
                </Link>

                {/* Tag */}
                <div className="flex-grow flex items-end mt-3">
                    <p className="bg-accent rounded-xl w-fit px-2 text-baseSecondary text-sm">{user?.tag}</p>
                </div>

            </div>
        ))}
    </div>
  )
}

export default CardList