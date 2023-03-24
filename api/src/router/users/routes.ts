import { User } from '../../models/user';
import formidable from 'formidable';
import { ValidationError } from '../../errors';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '../../constants';
import { saveFile } from '../../services/saveFile';

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

export const uploadAvatar = (req, res, next) => {
  const form = formidable({ maxFields: 1, multiples: false });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    const filesToSave = Object.entries(files).reduce((accum, [, data]) => {
      if (Array.isArray(data)) {
        return next(new ValidationError(`You can upload only one avatar`));
      } else {
        if (!['image/jpg', 'image/jpeg'].includes(data.mimetype)) {
          return next(
            new ValidationError(
              `Invalid file type for avatar ${data.originalFilename}`
            )
          );
        }
        accum.push(saveFile(data.filepath, data.newFilename, data.mimetype));
      }
      return accum;
    }, []);
    return Promise.all(filesToSave)
      .then((r) => res.send(r[0]))
      .catch((e) => next(e));
  });
};
