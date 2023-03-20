import { User } from '../../models/user';

export const loginUser = async ({ body }, res, next) => {
  try {
    const loginUser: Pick<User, 'username' | 'password'> = body;

    const registeredUser = await User.findOne({
      where: { username: loginUser.username, password: loginUser.password }
    });

    if (registeredUser) {
      return res.send(registeredUser.toJSON());
    } else {
      return res.send('User not found');
    }
  } catch (e) {
    next(e);
  }
};

export const createUser = async ({ body }, res, next) => {
  const user = new User({
    username: body?.username,
    email: body?.email,
    password: body?.password,
    homePage: body?.homePage,
    avatar: body?.avatar
  });
  user
    .save()
    .then(() => {
      res.send(user.toJSON());
    })
    .catch((e) => next(e));
};
