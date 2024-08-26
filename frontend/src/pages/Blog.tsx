import { FullBlog } from "../components/FullBlog";
import { Skeleton } from "../components/Skeleton";
import { useBlog } from "../hooks";
import { useParams } from 'react-router-dom';


export function Blog() {

  const {id} = useParams();
  const { blog, loading } = useBlog({id: id || "1"});
  
  if(loading)
    return <div className="flex justify-center">
      <Skeleton></Skeleton>
    </div>

  if(!blog)
    return <div>
      post does not exist
    </div>

  return <div>
    <FullBlog 
    //@ts-ignore
    blog = {blog}
    ></FullBlog>
  </div>
}