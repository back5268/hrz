import { Cardz } from '@components/core';
import { TabPanel, TabView } from 'primereact/tabview';
import { Infos } from './Info';
import { History } from './History';
import { Contracts } from './Contracts';
import { useParams } from 'react-router-dom';

export const DetailPersonnel = () => {
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
        </TabView>
      ) : (
        <Infos />
      )}
    </Cardz>
  );
};
