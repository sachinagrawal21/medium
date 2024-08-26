import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from "@sachinagr/medium-common";

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string,
	}
}>();

userRouter.post("/signup",async (c) => {

  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if(!success)
  {
    c.status(411);
    return c.text("invalid input");
}
  const response = await prisma.user.findUnique({
    where: {
      email: body.email
    }
  });

  if(response){
    c.status(411);
    return c.text("user already exists");
  }
  try{
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name
      }
    });
  
    const payload = {
      user_id: user.id
    };
    const token = await sign(payload,c.env.JWT_SECRET);
    return c.text(token);
  } catch(e) {
      c.status(403);
      return c.json({
        error: "error while signing up"
      });
  }
})

userRouter.post("/signin",async (c) => {
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try{
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        msg: "invalid input"
    });
  }
    const response = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password
      }
    });
    if(response)
    {
      const payload = {
        user_id: response.id
      };
      const token = await sign(payload,c.env.JWT_SECRET);
      return c.text(token);
    }
    return c.json({
      message: "invalid credentials"
    });
  } catch(e) {
    c.status(411);
    return c.json({
      msg: "invalid"
    });
  }
})
