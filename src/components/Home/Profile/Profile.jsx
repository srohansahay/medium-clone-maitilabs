import React, { useState } from "react";
import ProfileHome from "./Activities/ProfileHome";
import ProfileAbout from "./Activities/ProfileAbout";
import EditProfile from "./EditProfile";
import { Blog } from "../../../Context/Context";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { allUsers, currentUser } = Blog();
  const { userId } = useParams();
  const activities = [
    {
      title: "Home",
      comp: ProfileHome,
    },
    {
      title: "About",
      comp: ProfileAbout,
    },
  ];
  const [currentActive, setCurrentActive] = useState(activities[0]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const getUserData = allUsers.find((user) => user.id === userId);

  return (
    <section className="size flex gap-[4rem] relative">
      {/* users activities  */}
      <div className="mt-[9rem] flex-[2]">
        <div className="flex items-end gap-4">
          <h2 className="text-3xl sm:text-5xl font-bold capitalize">
            {getUserData?.username}
          </h2>
        </div>
        <div className="flex items-center gap-5 mt-[1rem] border-b border-gray-300 mb-[3rem]">
          {activities.map((item, i) => (
            <div
              key={i}
              className={`py-[0.5rem]
            ${
              item.title === currentActive.title
                ? "border-b border-gray-500"
                : ""
            }
            `}>
              <button onClick={() => setCurrentActive(item)}>
                {item.title}
              </button>
            </div>
          ))}
        </div>
        <currentActive.comp
          getUserData={getUserData}
          setEditModal={setEditModal}
        />
      </div>
      {editModal && (
        <EditProfile
          getUserData={getUserData}
          editModal={editModal}
          setEditModal={setEditModal}
        />
      )}
    </section>
  );
};

export default Profile;
