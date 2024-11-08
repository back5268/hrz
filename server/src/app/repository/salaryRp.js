import { detailAccountMd, detailSalaryMd, detailTemplateMd } from '@models';
import { formatNumber, ghepGiaTri, replaceFistText } from '@utils';
import { JSDOM } from 'jsdom';

export const previewSalaryRp = async (_id) => {
  const data = await detailSalaryMd({ _id });
  if (!data) return { status: 0, mess: 'Phiếu lương không tồn tại!' };
  const template = await detailTemplateMd({ type: 5 });
  if (!template || !template.content) return { status: 0, mess: 'Không có mẫu phiếu lương!' };
  const account = await detailAccountMd({ _id: data.account });
  if (!account) return { status: 0, mess: 'Không tìm thấy nhân viên!' };
  const content = template.content;
  const subject = template.subject;

  const templateHtml = new JSDOM(content, { contentType: 'text/html' });
  const table = templateHtml.window.document.querySelector('table');
  const tbodys = table.querySelectorAll('tbody');
  const tbody2 = tbodys[1];
  let newBody2 = '';
  const allowances = data.allowances;
  newBody2 += tbody2.querySelectorAll('tr')[0].outerHTML;
  allowances?.forEach((allowance, index) => {
    const content = tbody2.querySelectorAll('tr')[1].outerHTML;
    newBody2 += replaceFistText(
      ghepGiaTri({
        params: {
          $stt: `B.${index + 1}`,
          $ten_phu_cap: allowance.name + ` (${allowance.type === 1 ? 'Theo tháng' : 'Theo ngày công thực tế'})`,
          $so_tien_phu_cap: `${formatNumber(allowance.summary)}`
        },
        content
      })
    );
  });
  newBody2 += tbody2.querySelectorAll('tr')[2].outerHTML;
  newBody2 += tbody2.querySelectorAll('tr')[3].outerHTML;
  tbody2.innerHTML = newBody2;
  const html = templateHtml.window.document.querySelector('main').outerHTML;

  const params = {
    $ho_va_ten: account.fullName,
    $ma_nhan_vien: account.staffCode,
    $tong_thu_nhap_thang: 100,
    $luong_bhxh: 100,
    $luong_thu_viec: account.type === 2 ? account.salary : 0,
    $luong_chinh_thuc: account.type === 1 ? account.salary : 0,
    $ngay_nghi_khong_luong: account.type === 1 ? account.salary : 0,
    $ngay_nghi_bhxh: account.type === 1 ? account.salary : 0,
    $ngay_nghi_khong_luong: account.type === 1 ? account.salary : 0,
    $cong_thu_viec: account.type === 1 ? account.salary : 0,
    $cong_chinh_thuc: account.type === 1 ? account.salary : 0,
    $cong_them_gio: account.type === 1 ? account.salary : 0,
    $ngay_di_lam_cham_cong: account.type === 1 ? account.salary : 0,
    $ngay_nghi_phep_nam: account.type === 1 ? account.salary : 0,
    $ngay_nghi_le_tet: account.type === 1 ? account.salary : 0,
    $ngay_nghi_che_do: account.type === 1 ? account.salary : 0,
    $nghi_bu: account.type === 1 ? account.salary : 0,
    $so_ngay_di_tre: account.type === 1 ? account.salary : 0,
    $tien_phat_di_tre: account.type === 1 ? account.salary : 0,
    $gia_tri_bhyt: account.type === 1 ? account.salary : 0,
    $tien_bhyt: account.type === 1 ? account.salary : 0,
    $gia_tri_bhxh: account.type === 1 ? account.salary : 0,
    $tien_bhxh: account.type === 1 ? account.salary : 0,
    $gia_tri_bhtn: account.type === 1 ? account.salary : 0,
    $tien_bhtn: account.type === 1 ? account.salary : 0,
    $gia_tri_phi_cong_doan: account.type === 1 ? account.salary : 0,
    $tien_phi_cong_doan: account.type === 1 ? account.salary : 0,
    $thue_thu_nhap: account.type === 1 ? account.salary : 0,
    $thue_thu_nhap: account.type === 1 ? account.salary : 0,
    $thu_nhap_chiu_thue: account.type === 1 ? account.salary : 0,
    $giam_tru_ban_than: account.type === 1 ? account.salary : 0,
    $giam_tru_gia_canh: account.type === 1 ? account.salary : 0,
    $so_nguoi_phu_thuoc: account.type === 1 ? account.salary : 0,
    $thu_nhap_tinh_thue: account.type === 1 ? account.salary : 0,
    $tien_luong_thuc_nhan: data.summary
  };
  return {
    status: 1,
    data: {
      html: replaceFistText(ghepGiaTri({ params, content: html })),
      subject: replaceFistText(ghepGiaTri({ params: { $ky_thang: data.month }, content: subject })),
      account
    }
  };
};
