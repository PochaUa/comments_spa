import formidable from 'formidable';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '../../constants';
import { ValidationError } from '../../errors';
import { getComments } from '../../services/getComments';
import { saveFile } from '../../services/saveFile';
import { addComment } from '../../services/addComment';

export const commentsGet = async (req, res, next) => {
  await getComments(req?.query?.parentId)
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

export const commentAdd = async (req, res, next) => {
  const comment = req.body;

  await addComment(comment)
    .then((r) => res.send(r))
    .catch((e) => next(e));
};
