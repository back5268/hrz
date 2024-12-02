import { Cardz } from '@components/core';
import { TabPanel, TabView } from 'primereact/tabview';
import { Infos } from './Info';
import { History } from './History';
import { Contracts } from './Contracts';
import { useParams } from 'react-router-dom';
import { Application } from '@view/admin/approval';
import { Salary } from '@view/admin/payroll';

export const DetailEmployee = () => {
  const { _id } = useParams();

  return (
    <Cardz>
      {_id ? (
        <TabView>
          <TabPanel header="Thông tin nhân viên">
            <Infos />
          </TabPanel>
          <TabPanel header="Lịch sử làm việc">
            <History />
          </TabPanel>
          <TabPanel header="Thông tin hợp đồng">
            <Contracts />
          </TabPanel>
          <TabPanel header="Đơn từ">
            <Application _id={_id} />
          </TabPanel>
          <TabPanel header="Phiếu lương">
            <Salary _id={_id} />
          </TabPanel>
        </TabView>
      ) : (
        <Infos />
      )}
    </Cardz>
  );
};
