import { Comment } from '../models/comment';
import { User } from '../models/user';

export const getComments = (parentId?: string) => {
  return Comment.findAll({
    where: { parentId: parentId || null },
    include: [
      {
        as: 'user',
        model: User,
        attributes: ['id', 'username', 'email', 'avatar']
      },
      'subComments'
    ]
  });
};
