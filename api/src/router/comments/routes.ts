import { Comment } from '../../models/comment';
import { User } from '../../models/user';
import formidable from 'formidable';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '../../constants';
import { rename } from 'fs/promises';
import { ValidationError } from '../../errors';

const saveFile = async (
  tmpPath: string,
  newFileName: string,
  fileType: string
) => {
  const systemFileName = `${newFileName}.${fileType.split('/')[1]}`;
  const urlFile = `${process.env.ASSETS_PATH}/${systemFileName}`;
  await rename(tmpPath, urlFile);
  return urlFile;
};

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
      res.send(r);
    })
    .catch((e) => next(e));
};

export const uploadFile = (req, res, next) => {
  const form = formidable({ maxFields: 1, multiples: false });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    const filesToSave = Object.entries(files).reduce((accum, [, data]) => {
      if (Array.isArray(data)) {
        return next(new ValidationError(`You can upload only one file`));
      } else {
        if (!ALLOWED_FILE_TYPES.includes(data.mimetype)) {
          return next(
            new ValidationError(
              `Invalid file type for file ${data.originalFilename}`
            )
          );
        }
        if (data.mimetype === 'text/plain' && data.size > MAX_FILE_SIZE) {
          return next(
            new ValidationError(
              `Size is larger than allowed for file ${data.originalFilename}`
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

export const addComment = async (req, res, next) => {
  const comment = req.body;

  await Comment.create(comment)
    .then((r) => res.send(r))
    .catch((e) => next(e));
};
