import { generateId } from "lucia";
import type { ProtectedTRPCContext } from "../../trpc";
import type {
  CreatePostInput,
  DeletePostInput,
  GetPostInput,
  ListPostsInput,
  MyPostsInput,
  UpdatePostInput,
} from "./post.input";

export const listPosts = async (ctx: ProtectedTRPCContext, input: ListPostsInput) => {
  return ctx.db.post.findMany({
    where: { status: "published" },
    skip: (input.page - 1) * input.perPage,
    take: input.perPage,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      excerpt: true,
      status: true,
      createdAt: true,
      user: { select: { email: true } },
    },
  });
};

export const getPost = async (ctx: ProtectedTRPCContext, { id }: GetPostInput) => {
  return ctx.db.post.findUnique({
    where: { id },
    include: { user: { select: { email: true } } },
  });
};

export const createPost = async (ctx: ProtectedTRPCContext, input: CreatePostInput) => {
  const id = generateId(15);

  const post = await ctx.db.post.create({
    data: {
      id,
      userId: ctx.user.id,
      title: input.title,
      excerpt: input.excerpt,
      content: input.content,
    },
  });

  return { id: post.id };
};

export const updatePost = async (ctx: ProtectedTRPCContext, input: UpdatePostInput) => {
  return ctx.db.post.update({
    where: { id: input.id },
    data: {
      title: input.title,
      excerpt: input.excerpt,
      content: input.content,
    },
  });
};

export const deletePost = async (ctx: ProtectedTRPCContext, { id }: DeletePostInput) => {
  return ctx.db.post.delete({
    where: { id },
  });
};

export const myPosts = async (ctx: ProtectedTRPCContext, input: MyPostsInput) => {
  return ctx.db.post.findMany({
    where: { userId: ctx.user.id },
    skip: (input.page - 1) * input.perPage,
    take: input.perPage,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      excerpt: true,
      status: true,
      createdAt: true,
    },
  });
};