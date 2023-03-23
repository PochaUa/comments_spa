import { Router } from 'express';
import comments from './comments';
import users from './users';

const router = Router();

router.get('/api/comments', comments.routes.commentsGet);
router.post('/api/comment', comments.routes.addComment);
router.post('/api/comment/uploadFile', comments.routes.uploadFile);

router.post(
  '/api/user/login',
  users.validation.loginUser,
  users.routes.loginUser
);
router.post('/api/user/register', users.routes.createUser);

export default router;
