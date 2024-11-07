import { accounts, configs, departments, jobPositions, positions, templates, tools } from '@data';
import {
  createAccountMd,
  createConfigMd,
  createDepartmentMd,
  createJobPositionMd,
  createPositionMd,
  createTemplateMd,
  createToolMd
} from '@models';

export const setup = async () => {
  for (const account of accounts) {
    await createAccountMd(account);
  }
  for (const position of positions) {
    await createPositionMd(position);
  }
  for (const jobPosition of jobPositions) {
    await createJobPositionMd(jobPosition);
  }
  for (const department of departments) {
    await createDepartmentMd(department);
  }
  for (const template of templates) {
    await createTemplateMd(template);
  }
  for (const config of configs) {
    await createConfigMd(config);
  }
  for (const tool of tools) {
    await createToolMd(tool);
  }
  console.log('Setup date done!');
};
