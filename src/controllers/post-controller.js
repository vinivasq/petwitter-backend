import { prisma } from "../helpers/utils.js";

export const getPost = async (request, reply) => {
  const { id, userId, cursor } = request.query;
  let myCursor;

  try {
    if (id) {
      const post = await prisma.post.findUnique({
        where: {
          id: Number(id),
        },
      });
      return post;
    }

    if (userId) {
      const post = await prisma.post.findMany({
        where: {
          userId: Number(userId),
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return post;
    }

    if (cursor) {
      const posts = await prisma.post.findMany({
        take: 4,
        skip: 1,
        cursor: {
          id: Number(cursor),
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      const lastPost = posts[3];
      myCursor = lastPost.id;

      return { posts, myCursor };
    }

    const posts = await prisma.post.findMany({
      take: 7,
      orderBy: {
        createdAt: "desc",
      },
    });

    const lastPost = posts[6];
    myCursor = lastPost.id;

    return { posts, myCursor };
  } catch (error) {
    reply.status(500).send("Não foi possível listar os posts");
    console.log(error);
  }
};

export const createPost = async (request, reply) => {
  const { userId, content } = request.body;

  try {
    const post = await prisma.post.create({
      data: {
        userId,
        content,
      },
    });
    return post;
  } catch (error) {
    reply.status(500).send("Não foi possível criar o post");
    console.log(error);
  }
};
