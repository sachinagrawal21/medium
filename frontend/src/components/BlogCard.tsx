import { Link } from "react-router-dom";

type BlogInput = {
  authorName: string ;
  title: string;
  content: string;
  publishedDate: String;
  id: number;
}

export function BlogCard({authorName, title, content, publishedDate, id}: BlogInput) {

  return <Link to={`/blog/${id}`}>
  <div className="p-4 w-screen max-w-screen-md cursor-pointer">
    <div className="flex">
      <div className="flex justify-center flex col">
        <Avatar name="sachin"></Avatar>
      </div>
      
      <div className=" flex pl-2">
        <div className="font-semibold pr-2">
          {authorName}
        </div>
        <div className="font-extralight">
          {publishedDate}
        </div>
      </div>
    </div>
    
    <div className="font-bold text-2xl">  
      {title}
    </div>
    <div className="font-thin">
      {content.slice(0,100) + "..."}
    </div>
    <div className="pb-2">
      {Math.ceil(content.length/100)} min read
    </div>
    <div className="border border-slate-200 w-full ">
    </div>
  </div>
  </Link>
}

export function Avatar({name}:{name: string}) {
  return <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
  </div>
  
}