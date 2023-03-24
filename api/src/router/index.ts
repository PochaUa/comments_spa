import { Router } from 'express';
import comments from './comments';
import users from './users';

const router = Router();

router.get('/api/comments', comments.routes.commentsGet);
router.post('/api/comment', comments.routes.commentAdd);
router.post('/api/comment/uploadFile', comments.routes.uploadFile);

router.post(
  '/api/user/login',
  users.validation.loginUser,
  users.routes.loginUser
);
router.post(
  '/api/user/register',
  users.validation.createUser,
  users.routes.createUser
);
router.post('/api/user/uploadAvatar', users.routes.uploadAvatar);

export default router;
