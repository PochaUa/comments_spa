import { ValidationError } from '../../errors';

export const loginUser = (req, res, next) => {
  const user = req.body;
  if (!(typeof user === 'object' && user !== null && !Array.isArray(user))) {
    throw new ValidationError('Invalid request');
  }
  [
    typeof user.username !== 'string',
    typeof user.password !== 'string',
    user.password?.length < 5
  ].forEach((condition) => {
    if (condition) {
      throw new ValidationError('Invalid username or password');
    }
  });
  next();
};

export const createUser = (req, res, next) => {
  const user = req.body;

  const requiredKeys: { [key: string]: string } = {
    username: 'string',
    email: 'string',
    password: 'string',
    homePage: 'string',
    avatar: 'string'
  };

  Object.keys(requiredKeys).forEach((key) => {
    if (!(typeof user[key] === requiredKeys[key])) {
      throw new ValidationError('Incorrect shape user');
    }
  });
  next();
};
