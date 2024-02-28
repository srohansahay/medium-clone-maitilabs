import React from "react";
import Posts from "../Common/Posts/Posts";

const Demo = () => {
  return (
    <>
      <div className="size py-7 flex flex-col-reverse md:flex-row gap-[7rem]">
        <div className="flex-[1.5]">
          <Posts />
        </div>
      </div>
    </>
  );
};

export default Demo;
