import { rename } from 'fs/promises';

export const saveFile = async (
  tmpPath: string,
  newFileName: string,
  fileType: string
) => {
  const systemFileName = `${newFileName}.${fileType.split('/')[1]}`;
  const urlFile = `${process.env.ASSETS_PATH}/${systemFileName}`;
  await rename(tmpPath, urlFile);
  return urlFile;
};
