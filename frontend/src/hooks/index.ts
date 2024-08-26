import axios from "axios";
import { useEffect, useState } from "react";
import { DATABASE_URL } from "../config";

export interface Blog {
  "author": {
      name: string
    },
  "title": string,
  "content": string,
  "id": number,
}

export function useBlog({id}:{id:string}) {
  const [loading,setLoading] = useState(true);
  const [blog,setBlog] = useState<Blog>();

  useEffect(() => {
    axios.get(`${DATABASE_URL}/blog/${id}`,{
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(response => {
        setBlog(response.data.post);
        setLoading(false);
      })
  },[id])

  return {
    loading,
    blog
  };
} 

export function useBlogs() {
  const [loading,setLoading] = useState(true);
  const [blogs,setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios.get(`${DATABASE_URL}/blog/bulk`,{
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(response => {
        setBlogs(response.data.post);
        setLoading(false);
      })
  },[])

  return {
    loading,
    blogs
  };
}