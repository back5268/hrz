import { detailAccountMd, detailSalaryMd, detailTemplateMd } from '@models';
import { ghepGiaTri, replaceFistText } from '@utils';
import { JSDOM } from 'jsdom';

export const previewSalaryRp = async (_id, dataz) => {
  const data = dataz ? dataz : await detailSalaryMd({ _id });
  if (!data) return { status: 0, mess: 'Phiếu lương không tồn tại!' };
  const template = await detailTemplateMd({ type: 5 });
  if (!template || !template.content) return { status: 0, mess: 'Không có mẫu phiếu lương!' };
  const account = await detailAccountMd({ _id: data.account });
  if (!account) return { status: 0, mess: 'Không tìm thấy nhân viên!' };
  const content = template.content
  const subject = template.subject;
  let allowanceAmount = 0;
  const templateHtml = new JSDOM(content, { contentType: 'text/html' });
  const table = templateHtml.window.document.querySelector('table');
  const tbodys = table.querySelectorAll('tbody');
  const tbody2 = tbodys[1];
  let newBody2 = '';
  const allowances = data.allowances;
  newBody2 += tbody2.querySelectorAll('tr')[0].outerHTML;
  allowances?.forEach((allowance, index) => {
    const content = tbody2.querySelectorAll('tr')[1].outerHTML;
    allowanceAmount += allowance.summary;
    newBody2 += replaceFistText(
      ghepGiaTri({
        params: {
          $stt: `B.${index + 1}`,
          $ten_phu_cap: allowance.name + (!allowance.type ? '' : ` (${allowance.type === 1 ? 'Theo tháng' : 'Theo ngày công thực tế'})`),
          $so_tien_phu_cap: allowance.summary
        },
        content
      })
    );
  });
  newBody2 += tbody2.querySelectorAll('tr')[2].outerHTML;
  newBody2 += tbody2.querySelectorAll('tr')[3].outerHTML;
  tbody2.innerHTML = newBody2;
  const html = templateHtml.window.document.querySelector('main').outerHTML;
  const day = data.day || {};
  const mandatory = data.mandatory || {};
  const tax = data.tax || {};
  const accountInfo = data.accountInfo;
  const numberWork = day.nomal;
  const params = {
    $ho_va_ten: account.fullName,
    $ma_nhan_vien: account.staffCode,
    $tong_thu_nhap_trong_thang: allowanceAmount + data.officialSalary,
    $tong_luong_theo_ngay_cong: data.officialSalary,
    $luong_bhxh: accountInfo.salary,
    $luong_thu_viec: accountInfo.type === 2 ? accountInfo.salary : '',
    $luong_chinh_thuc: data.officialSalary,
    $ngay_nghi_khong_luong: day.noSalary || '',
    $ngay_nghi_bhxh: '',
    $cong_thu_viec: accountInfo.type === 2 ? numberWork : '',
    $cong_chinh_thuc: accountInfo.type === 1 ? numberWork : '',
    $cong_them_gio: day.ot || '',
    $ngay_di_lam_cham_cong: (day.nomal + day.ot + day.holiday + day.annualLeave + day.regime) || '',
    $ngay_nghi_phep_nam: day.annualLeave || '',
    $ngay_nghi_le_tet: day.holiday || '',
    $ngay_nghi_che_do: day.regime || '',
    $nghi_bu: day.compensatoryLeave || '',
    $so_ngay_di_tre: data.soonLates?.length || '',
    $tien_phat_di_tre: data.soonLates?.reduce((a, b) => a + b.summary, 0) || "",
    $tong_phu_cap: allowanceAmount,
    $tong_cac_khoan_tru: data.mandatoryAmount,
    $gia_tri_bhyt: mandatory?.bhyt?.value,
    $tien_bhyt: mandatory?.bhyt?.summary,
    $gia_tri_bhxh: mandatory?.bhxh?.value,
    $tien_bhxh: mandatory?.bhxh?.summary,
    $gia_tri_bhtn: mandatory?.bhtn?.value,
    $tien_bhtn: mandatory?.bhtn?.summary,
    $gia_tri_phi_cong_doan: mandatory?.unionDues?.value,
    $tien_phi_cong_doan: mandatory?.unionDues?.summary,
    $thue_thu_nhap: tax.summary,
    $thu_nhap_chiu_thue: data.pretaxIncome,
    $giam_tru_ban_than: tax.self,
    $giam_tru_gia_canh: tax.dependent?.value * tax.dependent?.quantity || "",
    $so_nguoi_phu_thuoc: tax.dependent?.quantity || "",
    $thu_nhap_tinh_thue: tax.total,
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
