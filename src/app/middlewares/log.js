import Logs from '../models/Logs';

export default async (req, res, next) => {
  await Logs.create({
    description: `Acesso: ${req.url}.`,
  });

  return next();
};
