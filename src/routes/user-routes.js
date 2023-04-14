import { validateRequest } from "../middleware/auth.js";
import * as UserController from "../controllers/user-controller.js";

export default {
  getUser: {
    method: "GET",
    url: "/user",
    preHandler: [validateRequest],
    handler: UserController.getUser,
  },
};
