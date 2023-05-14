import { prisma } from "../helpers/utils.js";

export const getPost = async (request, reply) => {
  const { userId, cursor } = request.query;

  if (userId) {
    let myCursor;

    if (cursor >= 7) {
      const posts = await prisma.post.findMany({
        take: 7,
        skip: 1,
        cursor: {
          id: Number(cursor),
        },
        where: {
          userId: Number(userId),
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const lastPost = posts[posts.length - 1];
      myCursor = lastPost.id;
      return { posts, myCursor };
    } else if (cursor < 7) {
      const posts = await prisma.post.findMany({
        take: 6,
        skip: 1,
        cursor: {
          id: Number(cursor),
        },
        where: {
          userId: Number(userId),
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return { posts };
    }

    const posts = await prisma.post.findMany({
      take: 7,
      where: {
        userId: Number(userId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const lastPost = posts[posts.length - 1];
    myCursor = lastPost.id;
    return { posts, myCursor };
  } else {
    let myCursor;

    try {
      if (cursor) {
        const posts = await prisma.post.findMany({
          take: 7,
          skip: 1,
          cursor: {
            id: Number(cursor),
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        const lastPost = posts[posts.length - 1];
        myCursor = lastPost.id;

        return { posts, myCursor };
      }

      const posts = await prisma.post.findMany({
        take: 7,
        orderBy: {
          createdAt: "desc",
        },
      });

      const lastPost = posts[posts.length - 1];
      myCursor = lastPost.id;

      return { posts, myCursor };
    } catch (error) {
      reply.status(500).send("Não foi possível listar os posts");
      console.log(error);
    }
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
