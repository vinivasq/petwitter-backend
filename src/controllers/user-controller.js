import { prisma } from "../helpers/utils.js";

export const getUser = async (req, res) => {
  const { username, id } = req.query;

  try {
    if (id) {
      const user = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
        select: { name: true, username: true },
      });
      return user;
    }

    if (username) {
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
        select: { id: true, name: true, username: true },
      });
      return user;
    }

    const users = await prisma.user.findMany({
      select: { name: true, username: true },
    });
    return res.send({ data: { users } });
  } catch (error) {
    console.error("users", error);
    res.status(500).send({ error: `Cannot fetch users` });
  }
};
