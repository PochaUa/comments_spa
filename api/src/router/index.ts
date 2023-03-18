import { Router } from 'express';
import comments from './comments';
import users from './users';

const router = Router();

router.get('/api/comments', comments.routes.commentsGet);
router.post('/api/comment', comments.routes.addComment);

router.get('/api/users', users.routes.usersGet);
router.post('/api/user', users.routes.createUser);

export default router;
