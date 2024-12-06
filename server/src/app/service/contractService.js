import { getListBankVietQr } from '@lib/viet-qr';
import { detailAccountMd, detailContactMd, detailTemplateMd } from '@repository';
import { ghepGiaTri, replaceFistText } from '@utils';
import moment from 'moment';

export const previewContractService = async (_id, accountz, dataz) => {
  const data = dataz ? dataz : await detailContactMd({ _id });
  if (!data) return { status: 0, mess: 'Hợp đồng không tồn tại!' };
  const template = await detailTemplateMd({ type: data.type });
  if (!template || !template.content) return { status: 0, mess: 'Không có mẫu hợp đồng!' };
  const account = await detailAccountMd({ _id: accountz }, [{ path: 'jobPosition', select: 'name' }]);
  if (!account) return { status: 0, mess: 'Không tìm thấy nhân viên!' };
  const gender = account.gender;
  const banks = await getListBankVietQr();
  const subject = template.subject;
  const content = template.content;
  const params = {
    $so_hieu: data.code,
    $ho_va_ten: account.fullName?.toUpperCase(),
    $gioi_tinh: gender === 1 ? 'Nam' : gender === 2 ? 'Nữ' : 'Khác',
    $ngay_sinh: moment(account.birthday).format('DD/MM/YYYY'),
    $quoc_tich: account.nationality,
    $cmt: account.cmt,
    $ngay_cap: moment(account.dateOfIssue).format('DD/MM/YYYY'),
    $noi_cap: account.placeOfIssue,
    $dia_chi_thuong_tru: account.address,
    $so_tai_khoan: account.bankAccount,
    $ngan_hang: banks?.find((b) => b._id === account.bank)?.name,
    $vi_tri_cong_viec: account.jobPosition?.name || '',
    $ngay_ky: moment(data.signedDate).format('DD/MM/YYYY')
  };
  return {
    status: 1,
    data: {
      html: replaceFistText(ghepGiaTri({ params, content })),
      subject: replaceFistText(ghepGiaTri({ params: {}, content: subject })),
      account
    }
  };
};
