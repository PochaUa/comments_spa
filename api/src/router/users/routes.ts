import { User } from '../../models/user';

export const usersGet = async (req, res, next) => {
  User.findAll()
    .then((r) => res.send(r))
    .catch((e) => next(e));
};

export const createUser = async ({ body }, res, next) => {
  const user = new User({
    username: body.username,
    email: body.email,
    homePage: body.homePage || '',
    avatar: body.avatar
  });
  user
    .save()
    .then(() => res.send(user.toJSON()))
    .catch((e) => next(e));
};
