import { User } from "@/types/user";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

interface UserItemProps {
  user: User;
}

const UserItem = ({ user }: UserItemProps) => {
  return (
    <div className="px-8 py-4 bg-secondary rounded-lg flex items-center justify-between">
      <div className="flex items-center gap-x-4 md:gap-x-6">
        {/* TODO: replace with profile picture */}
        <Image
          src="/default_pfp.jpg"
          alt="profile picture"
          className="object-contain aspect-square object-center rounded-full"
          width={70}
          height={70}
        />
        <div className="flex flex-col items-start gap-y-1">
          <h1 className="text-2xl md:text-3xl font-semibold">
            {user.display_name}
          </h1>
          <h3 className="text-primary text-base">@{user.username}</h3>
        </div>
      </div>

      <Link href={`/profile/${user.username}`} className={buttonVariants()}>
        View
      </Link>
    </div>
  );
};

export default UserItem;
