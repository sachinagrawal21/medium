import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@sachinagr/medium-common";
export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string,
	},
  Variables: {
    user_id: string;
  }
}>();

blogRouter.use("/*", async(c,next)=> {

  const authHeader = c.req.header('authorization') || "";
  try{
    const decoded = await verify(authHeader,c.env.JWT_SECRET);

    if(decoded){
      //@ts-ignore
      c.set("user_id",decoded.user_id);
      await next();
    } else {
        c.status(403);
        return c.json({msg: "invalid token"});
    }
  } catch(e) {
    c.status(403);
    return c.json({
      msg: "you are not logged in"
    });
  }
})

blogRouter.post("/", async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if(!success)
  {
    c.status(411);
    return c.json({
      msg: "Invalid input"
    });
  }
  const author_id = c.get("user_id");
  const response = await prisma.post.create({
    data: {
      author_id: Number(author_id),
      title: body.title,
      content: body.content,
      published: true
    }
  });
  return c.json({
    id: response.id
  })
})

blogRouter.put("/",async (c)=> {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      msg: "Invalid input"
  });
}
  const response = await prisma.post.update({
    where: {
      id: Number(body.id)
    }, 
    data: {
      title: body.title ,
      content: body.content ,
    }
  });

  return c.json({
    id: response.id
  })
})

// Try implementing pagination
blogRouter.get("/bulk",async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const response = await prisma.post.findMany({
    select:{
      content: true,
      title: true,
      id: true,
      author: {
        select:{
          name:true
        }
      }
    }
  });
  console.log(response);
  return c.json({
    post: response
  });
})

blogRouter.get("/:id",async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try{
    const response = await prisma.post.findUnique({
      where: {
        id: Number(id)
      },
      select:{
        id: true,
        title: true,
        content: true,
        author: {
          select:{
            name: true
          }
        }
      }
    });

    return c.json({
      post: response
    });
  } catch(e) {
    c.status(411);
    return c.json({
      msg: "error while fetching post"
    })
  }
})

