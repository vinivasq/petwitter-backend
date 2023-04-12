import { validateRequest } from "../middleware/auth.js";
import * as postController from "../controllers/post-controller.js";

export default {
  getPost: {
    method: "GET",
    url: "/post",
    preHandler: [validateRequest],
    handler: postController.getPost,
  },
  createPost: {
    method: "POST",
    url: "/post",
    preHandler: [validateRequest],
    handler: postController.createPost,
  },
};
