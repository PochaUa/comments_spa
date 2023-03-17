import { Router } from 'express';
import comments from './comments';

const router = Router();

router.get('/api/comments', comments.routes.commentsGet);

export default router;
