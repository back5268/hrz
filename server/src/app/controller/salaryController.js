import { salaryStatus } from '@constant';
import { convertToExcel } from '@lib/excel-js';
import { convertHTMLToPDF } from '@lib/puppeteer';
import {
  deleteSalarysValid,
  detailSalaryValid,
  exportSalaryValid,
  handleSalaryValid,
  listSalaryValid,
  updateStatusSalaryValid
} from '@lib/validation';
import {
  countSalaryMd,
  createApplicationMd,
  createNotifyMd,
  deleteSalaryMd,
  detailSalaryMd,
  listAccountMd,
  listInsuranceMd,
  listPermissionMd,
  listSalaryMd,
  updateSalaryMd
} from '@repository';
import { previewSalaryService, sendMailSalary } from '@service';
import { validateData } from '@utils';
import { ioSk } from 'src';

export const getListSalary = async (req, res) => {
  try {
    const { error, value } = validateData(listSalaryValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { page, limit, month, department, account, status } = value;
    const where = {};
    if (month) where.month = month;
    if (department) where.department = department;
    if (account) where.account = account;
    if (status) where.status = status;
    const documents = await listSalaryMd(where, page, limit);
    const total = await countSalaryMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListSalaryPending = async (req, res) => {
  try {
    const { error, value } = validateData(listSalaryValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { page, limit, month, department, account } = value;
    const where = { status: 1 };
    if (month) where.month = month;
    if (department) where.department = department;
    if (account) where.account = account;
    const documents = await listSalaryMd(where, page, limit);
    const total = await countSalaryMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListSalaryPendingz = async (req, res) => {
  try {
    const { error, value } = validateData(listSalaryValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { page, limit, month, department, account } = value;
    const where = { status: 2 };
    if (month) where.month = month;
    if (department) where.department = department;
    if (account) where.account = account;
    const documents = await listSalaryMd(where, page, limit);
    const total = await countSalaryMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListSalaryApproved = async (req, res) => {
  try {
    const { error, value } = validateData(listSalaryValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { page, limit, month, department, account } = value;
    const where = { status: 3 };
    if (month) where.month = month;
    if (department) where.department = department;
    if (account) where.account = account;
    const documents = await listSalaryMd(where, page, limit);
    const total = await countSalaryMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListSalaryApp = async (req, res) => {
  try {
    const where = { account: req.account?._id };
    res.json({ status: 1, data: await listSalaryMd(where) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const updateStatusSalary = async (req, res) => {
  try {
    const { error, value } = validateData(updateStatusSalaryValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _ids, status, reason } = value;
    if (reason) {
      const notify = await createNotifyMd({
        account: '674c58330aadb53127af937a',
        content: `Phiếu lương bị từ chối với lý do: "${reason}"`,
        type: 5,
        data: {}
      });
      ioSk.emit(`notify_674c58330aadb53127af937a`, { data: notify });
    }
    if (Array.isArray(_ids)) {
      await updateSalaryMd({ _id: { $in: _ids } }, { status });
      if (status === 4) {
        for (const _id of _ids) {
          const { data, mess } = await previewSalaryService(_id);
          if (mess) continue;
          const { html, subject, account } = data;
          await sendMailSalary({ html, subject, to: account.email });
        }
      }
    }
    res.json({ status: 1, data: {} });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const deleteSalary = async (req, res) => {
  try {
    const { error, value } = validateData(detailSalaryValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailSalaryMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Phiếu lương không tồn tại!' });
    if (data.status !== 1) return res.json({ status: 0, mess: 'Phiếu lương đã được duyệt không thể xóa!' });
    res.status(201).json({ status: 1, data: await deleteSalaryMd({ _id, status: 1 }) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const deleteSalarys = async (req, res) => {
  try {
    const { error, value } = validateData(deleteSalarysValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _ids } = value;
    for (const _id of _ids) {
      const data = await detailSalaryMd({ _id });
      if (!data || data.status !== 1) continue;
      await deleteSalaryMd({ _id, status: 1 });
    }
    res.status(201).json({ status: 1, data: {} });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const detailSalary = async (req, res) => {
  try {
    const { error, value } = validateData(detailSalaryValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailSalaryMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Phiếu lương không tồn tại!' });
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const previewSalary = async (req, res) => {
  try {
    const { error, value } = validateData(detailSalaryValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { data, mess } = await previewSalaryService(value._id);
    if (mess) res.json({ status: 0, mess });
    else res.json({ status: 1, data: data.html });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const previewSalaryApp = async (req, res) => {
  try {
    const { error, value } = validateData(detailSalaryValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { data, mess } = await previewSalaryService(value._id);
    if (mess) res.json({ status: 0, mess });
    else res.json({ status: 1, data: { content: data.html, status: data.data?.status } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const downloadSalary = async (req, res) => {
  try {
    const { error, value } = validateData(detailSalaryValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const dataz = await detailSalaryMd({ _id });
    if (!dataz) return res.json({ status: 0, mess: 'Phiếu lương không tồn tại!' });
    if (dataz.file) return res.json({ status: 1, data: dataz.file });
    else {
      const { data, mess } = await previewSalaryService(_id, dataz);
      if (mess) res.json({ status: 0, mess });
      const file = await convertHTMLToPDF(data.html);
      await updateSalaryMd({ _id }, { file });
      return res.json({ status: 1, data: file });
    }
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const exportSalary = async (req, res) => {
  try {
    const { error, value } = validateData(exportSalaryValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { month, department, account, status } = value;
    const where = {};
    if (month) where.month = month;
    if (department) where.department = department;
    if (account) where.account = account;
    if (status) where.status = status;
    const data = await listSalaryMd(where);
    const dataz = [];
    dataz.push([
      'STT',
      'Nhân viên',
      'Mã nhân viên',
      'Tháng',
      'Lương cơ bản',
      'Số ngày được tính lương',
      'Số công chính thức',
      'Số công làm thêm giờ',
      'Lương theo ngày công',
      'Tổng phụ cấp, thu nhập phát sinh',
      'Phạt đi muộn về sớm',
      'Bảo hiểm',
      'Thuế thu nhập',
      'Lương thực nhận',
      'Trạng thái'
    ]);
    let index = 0;
    const accounts = await listAccountMd({});
    for (const datum of data) {
      index += 1;
      const account = accounts.find((a) => String(a._id) === String(datum.account));
      const accountInfo = datum.accountInfo;
      const number = datum.day?.nomal + datum.day?.ot + datum.day?.holiday + datum.day?.annualLeave + datum.day?.regime;
      dataz.push([
        index,
        account?.fullName,
        account?.staffCode,
        datum.month,
        accountInfo?.salary,
        number,
        datum.day?.nomal,
        datum.day?.ot,
        datum.officialSalary,
        datum.allowances?.reduce((a, b) => a + b.summary, 0) + datum.bonuses?.reduce((a, b) => a + b.summary, 0),
        datum.soonLates?.reduce((a, b) => a + b.summary, 0),
        datum.mandatoryAmount,
        datum.tax.summary,
        datum.summary,
        salaryStatus?.find((s) => s._id === datum.status)?.name
      ]);
    }
    res
      .status(200)
      .attachment('file.xlsx')
      .send(await convertToExcel(dataz));
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const exportSummarySalary = async (req, res) => {
  try {
    const { error, value } = validateData(exportSalaryValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { month, department, account, status } = value;
    const where = {};
    if (month) where.month = month;
    if (department) where.department = department;
    if (account) where.account = account;
    if (status) where.status = status;
    const data = await listSalaryMd(where);
    const dataz = [];
    dataz.push([
      'STT',
      'Nhân viên',
      'Mã nhân viên',
      'Chức vụ',
      'MST',
      'Tiền lương thực nhận theo ngày công',
      'Phụ cấp (Trách nhiệm, tiền ăn, ...)',
      'Tiền thưởng',
      'Tiền phạt (Đi muộn, về sớm)',
      'Tổng thu nhập thực tế',
      'Các khoản miễn thuế (Tiền ăn, điện thoại)',
      'Thu nhập chịu thuế',
      'Các khoản giảm trừ',
      'Phụ thuộc',
      'BH bắt buộc',
      'Tổng cộng',
      'Phí công đoàn',
      'Thu nhập tính thuế',
      'Thuế thu nhập cá nhân phải khấu trừ'
    ]);
    dataz.push([
      'STT',
      'Nhân viên',
      'Mã nhân viên',
      'Chức vụ',
      'MST',
      'Lương chính',
      'Phụ cấp',
      'Tiền thưởng',
      'Tiền phạt (Đi muộn, về sớm)',
      'Tổng thu nhập thực tế',
      'Các khoản miễn thuế (Tiền ăn, điện thoại)',
      'Thu nhập chịu thuế',
      'Bản thân',
      'Phụ thuộc',
      'BH bắt buộc',
      'Tổng cộng',
      'Phí công đoàn',
      'Thu nhập tính thuế',
      'Thuế thu nhập cá nhân phải khấu trừ'
    ]);
    dataz.push([
      '',
      '',
      '',
      '',
      '',
      '(1)',
      '(2)',
      '(3)',
      '(4)',
      '(5)=(1)+(2)+(3)-(4)',
      '(6)',
      '(7)=(5)-(6)',
      '(8)',
      '(9)',
      '(10)',
      '(11)=(8)+(9)+(10)',
      '(12)',
      '(13)=(7)-(11)+(12)',
      '(14)'
    ]);
    let index = 0;
    const accounts = await listAccountMd({}, false, false, [{ path: 'position', select: 'name' }]);
    const insurances = await listInsuranceMd({});
    for (const datum of data) {
      index += 1;
      const account = accounts.find((a) => String(a._id) === String(datum.account));
      const insurance = insurances.find((a) => String(a.account) === String(datum.account));

      const allowanceAmount = datum.allowances?.reduce((a, b) => a + b.summary, 0);
      const bonusAmount = datum.bonuses?.reduce((a, b) => a + b.summary, 0);
      const soonLateAmount = datum.soonLates?.reduce((a, b) => a + b.summary, 0);
      const amount = datum.officialSalary + allowanceAmount + bonusAmount - soonLateAmount;
      const noTax = datum.allowances.reduce((a, b) => {
        if (!b.isTax) return (a += b.summary);
        else return (a += 0);
      }, 0);
      const self = datum.tax?.self;
      const dependent = datum.tax?.dependent?.value * datum.tax?.dependent?.quantity;
      dataz.push([
        index,
        account?.fullName,
        account?.staffCode,
        account?.position?.name,
        insurance?.taxCode || '',
        datum.officialSalary,
        allowanceAmount,
        bonusAmount,
        soonLateAmount,
        amount,
        noTax,
        amount - noTax,
        self,
        dependent,
        datum.mandatoryAmount - datum.mandatory?.unionDues?.summary,
        self + dependent + datum.mandatoryAmount,
        datum.mandatory?.unionDues?.summary,
        amount - noTax - (self + dependent + datum.mandatoryAmount) + datum.mandatory?.unionDues?.summary,
        datum.tax?.summary
      ]);
    }

    const options = {
      mergeCells: [
        'A1:A2',
        'B1:B2',
        'C1:C2',
        'D1:D2',
        'E1:E2',
        'F1:G1',
        'H1:H2',
        'I1:I2',
        'J1:J2',
        'K1:K2',
        'L1:L2',
        'M1:P1',
        'Q1:Q2',
        'R1:R2',
        'S1:S2'
      ],
      alignments: [
        { A1: { horizontal: 'center', vertical: 'middle' } },
        { B1: { horizontal: 'center', vertical: 'middle' } },
        { C1: { horizontal: 'center', vertical: 'middle' } },
        { D1: { horizontal: 'center', vertical: 'middle' } },
        { E1: { horizontal: 'center', vertical: 'middle' } },
        { F1: { horizontal: 'center', vertical: 'middle' } },
        { F2: { horizontal: 'center', vertical: 'middle' } },
        { G2: { horizontal: 'center', vertical: 'middle' } },
        { H1: { horizontal: 'center', vertical: 'middle' } },
        { I1: { horizontal: 'center', vertical: 'middle' } },
        { J1: { horizontal: 'center', vertical: 'middle' } },
        { K1: { horizontal: 'center', vertical: 'middle' } },
        { L1: { horizontal: 'center', vertical: 'middle' } },
        { M1: { horizontal: 'center', vertical: 'middle' } },
        { M2: { horizontal: 'center', vertical: 'middle' } },
        { N2: { horizontal: 'center', vertical: 'middle' } },
        { O2: { horizontal: 'center', vertical: 'middle' } },
        { P2: { horizontal: 'center', vertical: 'middle' } },
        { Q1: { horizontal: 'center', vertical: 'middle' } },
        { R1: { horizontal: 'center', vertical: 'middle' } },
        { S1: { horizontal: 'center', vertical: 'middle' } }
      ],
      colors: [
        {
          FFADD8E6: [
            'A1',
            'B1',
            'C1',
            'D1',
            'E1',
            'F1',
            'F2',
            'G2',
            'H1',
            'I1',
            'J1',
            'K1',
            'L1',
            'M1',
            'M2',
            'N2',
            'O2',
            'P2',
            'Q1',
            'R1',
            'S1'
          ]
        }
      ]
    };

    res
      .status(200)
      .attachment('file.xlsx')
      .send(await convertToExcel(dataz, options));
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const handleSalary = async (req, res) => {
  try {
    const { error, value } = validateData(handleSalaryValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id, status, reason } = value;
    const dataz = await detailSalaryMd({ _id });
    if (!dataz) return res.json({ status: 0, mess: 'Phiếu lương không tồn tại!' });
    if (status === 1) {
      await updateSalaryMd({ _id }, { status: 2 });
      res.json({ status: 1, data: {} });
    } else {
      const data = await createApplicationMd({
        department: req.account?.department?._id,
        account: req.account?._id,
        type: 9,
        reason,
        month: dataz.month
      });
      const where = { 'tools.route': 'application' };
      const permissions = await listPermissionMd(where);
      const accounts = await listAccountMd({ role: 'admin' });
      for (const permission of permissions) {
        const accountz = await listAccountMd({ department: { $in: permission.departments }, position: { $in: permission.positions } });
        accountz.forEach((az) => !accounts.find((a) => a._id === az._id) && accounts.push(az));
      }
      for (const account of accounts) {
        const notify = await createNotifyMd({
          account: account._id,
          content: `${req.account.fullName} - ${req.account.staffCode} yêu cầu tính lại phiếu lương tháng ${dataz.month}!`,
          type: 2,
          data: { _id: data._id }
        });
        ioSk.emit(`notify_${account._id}`, notify);
      }
      res.json({ status: 1, data: {} });
    }
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
