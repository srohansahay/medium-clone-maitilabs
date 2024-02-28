const Pagination = ({  totalPosts,
 postsPerPage,
 setCurrentPage,
 currentPage,}) =>
{
 let pages = [];

 for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
     pages.push(i);
 }
   

   let pages1 = [
      { page: currentPage - 1 },
      { page: currentPage  },
      { page: currentPage + 1 },
   ]



   if(currentPage == Math.ceil(totalPosts / postsPerPage)){
      pages1 = [
         { page: currentPage - 3 },
         { page: currentPage - 2 },
         { page: currentPage - 1},
      ]
   }

   if(currentPage == Math.ceil(totalPosts / postsPerPage)-1){
      pages1 = [
         { page: currentPage - 2 },
         { page: currentPage -1 },
         { page: currentPage },
      ]
   }

   if(currentPage == 1){
      pages1 = [
         { page: currentPage  },
         { page: currentPage + 1 },
         { page: currentPage + 2 },
      ]
   }

   

   if(Math.ceil(totalPosts / postsPerPage)==3 || Math.ceil(totalPosts / postsPerPage)==2 ){
      pages1 = [
         { page: 1 },
         { page: 2  },
         
      ]

   }

   function Next ()
   {
      currentPage < Math.ceil(totalPosts / postsPerPage) && setCurrentPage(++currentPage)
   }
   function back ()
   {
      currentPage > 1 && setCurrentPage(--currentPage)
      
   }

    function last () {
      setCurrentPage(Math.ceil(totalPosts / postsPerPage));
    }

    function first () {
      setCurrentPage(1);
    }



   return (
      <div className="flex  rounded-lg font-[Poppins] z-40 content-center	justify-center	mb-10 ">
         <button onClick={back} className="sm:h-12 
               sm:px-4 sm:mr-12 mr-3">
            Prev
         </button>
         {
            pages1.map((pg, i) => (
             (pg.page <= Math.ceil(totalPosts / postsPerPage) ? <div>
              <button key={i} onClick={() => setCurrentPage(pg.page)} className={`sm:h-12 border-2 rounded-full sm:mr-4 border-white
              sm:w-12 w-10 mr-2 h-10 ${pg.page === currentPage && 'bg-black text-white border-0'}`}>{pg.page}</button></div>
               : 
              null
              )
                       
               
            ))
         }
         <button onClick={null} className="sm:h-12  rounded-full sm:mr-4 border-2 
               sm:px-4 mr-2 px-2 h-10">. . .
         </button>

         <button onClick={last} className={`sm:h-12 border-2 rounded-full sm:mr-4 border-white
              sm:w-12 w-10 h-10 ${Math.ceil(totalPosts / postsPerPage) === currentPage && 'bg-[black] text-white'}`}>
            {Math.ceil(totalPosts / postsPerPage)}
         </button>
         <button onClick={Next} className="sm:h-12 
               sm:px-4 sm:ml-12 ml-3">
            Next
         </button>
      </div>
   )
}

export default Pagination