import { Cardz } from '@components/core';
import { TabPanel, TabView } from 'primereact/tabview';
import { Notifyz } from './Notifyz';
import { Log } from './Log';
export * from './DetailNotifyz';

export const Notify = () => {
  return (
    <Cardz>
      <TabView>
        <TabPanel header="Danh sách thông báo">
          <Notifyz />
        </TabPanel>
        <TabPanel header="Lịch sử gửi thông báo">
          <Log />
        </TabPanel>
      </TabView>
    </Cardz>
  );
};
