import { Router } from 'express';
import comments from './comments';

const router = Router();

router.get('/comments', comments.routes.commentsGet);

export default router;
