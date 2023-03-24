import { Comment } from '../models/comment';

export const addComment = (comment: any) => {
  return Comment.create(comment);
};
