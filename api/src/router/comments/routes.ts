import { Comment } from '../../models/comment';
import { User } from '../../models/user';

export const commentsGet = async (req, res, next) => {
  Comment.findAll({
    where: { parentId: req?.query?.parentId || null },
    include: [
      {
        as: 'user',
        model: User,
        attributes: ['id', 'username', 'email', 'avatar']
      },
      'subComments'
    ]
  })
    .then((r) => {
      console.log(r);
      res.send(r);
    })
    .catch((e) => next(e));
};

export const addComment = async (req, res, next) => {
  const comment = req.body;

  await Comment.create(comment)
    .then((r) => res.send(r))
    .catch((e) => next(e));
};
