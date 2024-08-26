import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";
import { Skeleton } from "../components/Skeleton";

export function Blogs() {

  const {loading, blogs} = useBlogs();

  if(loading)
      return <div className="flex justify-center">
        <div>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
        </div>
      </div>
  return <div>
    <Appbar ></Appbar>
      <div className="flex justify-center ">
        <div className="">
          
          {blogs.map(b => <BlogCard 
          authorName={b.author.name || "Anonymous"}
          title = {b.title}
          content = {b.content}
          publishedDate={"2nd Feb 3231"}
          id = {b.id}
          ></BlogCard>)}
        </div>
      </div>
  </div>
}