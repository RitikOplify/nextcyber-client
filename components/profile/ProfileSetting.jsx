import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

function ProfileSetting() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="p-5">
      <h3 className="font-semibold">
        {user.firstName} {user.lastName}
      </h3>
      <p className="font-medium mt-1 mb-2.5">{user.email}</p>
      <Link href={"/update-profile"}>Update Profile</Link>
    </div>
  );
}

export default ProfileSetting;
