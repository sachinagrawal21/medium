import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import {Avatar} from "./BlogCard";

export function FullBlog({ blog } : {blog :Blog}) {
  
  blog.author.name = blog.author.name || "Anonymous";
  return <div>
    <Appbar></Appbar>
    <div className="grid grid-cols-12 p-12">
      <div className="col-span-8 pl-4">
        <div className="font-bold text-5xl">
          {blog.title}
        </div>
        <div className="text-slate-500 py-2">
          Posted on 2nd Dec 2023
        </div>
        <div className="text-slate-800	pt-2">
          {blog.content}
        </div>  
      </div>

      <div className="col-span-4 pl-8">
        <div className="font-semibold text-slate-500">
          Author
        </div>
        <div className="flex pt-2">
            <div className="flex flex-col justify-center pr-4">
              <Avatar name={blog.author.name[0]}></Avatar>
            </div>
            
            <div>
              <div className="font-bold text-2xl">
                {blog.author.name}
              </div>
              <div className="text-slate-500">
                Random catchphrase about author
              </div>
            </div>
        </div>
        
        
      </div>
    </div>
  </div>
}