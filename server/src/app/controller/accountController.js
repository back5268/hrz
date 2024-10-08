import { listAccountMd } from "@models";

export const getListAccountInfo = async (req, res) => {
  res.json({ status: 1, data: await listAccountMd({}) });
};
