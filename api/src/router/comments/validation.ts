import { ValidationError } from '../../errors';

export const addComment = (req, res, next) => {
  const comment = req.body;

  const requiredKeys: { [key: string]: string } = {
    userId: 'string',
    file: 'string',
    text: 'string',
    parentId: 'null' || 'number'
  };

  Object.keys(requiredKeys).forEach((key) => {
    if (!(typeof comment[key] === requiredKeys[key])) {
      throw new ValidationError('Incorrect shape user');
    }
  });
  next();
};
