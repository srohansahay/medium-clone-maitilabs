import React from "react";
import Posts from "../Common/Posts/Posts";

const Home = () => {
  return (
    <section className="size flex gap-[5rem] relative">
      <div className="flex-[2] py-10 mb-[4rem]">
        <Posts />
      </div>
    </section>
  );
};

export default Home;
