import {useEffect, useState} from "react";
import Loading from "../../Loading/Loading";
import PostsCard from "./PostsCard";
import { Blog } from "../../../Context/Context";
import Pagination from "../../Pagination";

const Posts = () => {
  const { postData, postLoading } = Blog();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  //const [myPostsList, setMyPostsList] = useState([]);

  const myPostsList = postData.slice(currentPage*6-6,currentPage*6);
  
  return (
    <section className="flex flex-col gap-[2.5rem]">
      {postLoading ? (
        <Loading />
      ) : (
        postData &&
        <div>
        {myPostsList?.map((post, i) => <PostsCard post={post} key={i} />)}
        <Pagination totalPosts={postData.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/> </div>
      )
      } 
    </section>
    
  );
};

export default Posts;
