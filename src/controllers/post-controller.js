import { prisma } from "../helpers/utils.js";

export const getPost = async (request, reply) => {
  const { id } = request.query;

  try {
    if (id) {
      const post = await prisma.post.findUnique({
        where: {
          id: Number(id),
        },
      });
      return post;
    }

    const post = await prisma.post.findMany();
    return post;
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
