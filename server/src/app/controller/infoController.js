import { getListBankVietQr } from '@lib/viet-qr';

export const getListBankInfo = async (req, res) => {
  try {
    res.status(200).json({ status: 1, data: await getListBankVietQr() });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
