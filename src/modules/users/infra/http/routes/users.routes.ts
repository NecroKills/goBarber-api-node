import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import UsersController from '@modules/users/controllers/UsersController';
import UsersAvatarController from '@modules/users/controllers/UserAvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();
const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
