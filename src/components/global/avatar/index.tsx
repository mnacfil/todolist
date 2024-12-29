"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";

const ProfileAvatar = () => {
  const { user } = useUser();
  return (
    <Avatar className="w-7 h-7 mt-2">
      <AvatarImage src={user?.imageUrl || "https://github.com/shadcn.png"} />
      <AvatarFallback>P</AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
