export interface ruleType {
  id: string;
  title: string;
  triggers: number;
  addTags?: Array<string>;
  createdAt: Date;
  appId: string;
  creatorId: string;
  isDeleted: 'no' | 'yes';
  lastTriggeredAt: Date;
  remindAdmins: number[];
  removeTags: string[];
  scope: string[];
  status: 'enabled' | 'disabled';
  updatedAt: Date;
}

interface IProperties {
  name: string;
  desc: string;
  value: string;
  ChannelInfo?: string;
  TimeInfo?: string;
  Rule?: string;
}
export interface ISearchList {
  key: string;
  title: string;
  type: 'faq' | 'graph';
  content: string;
  properties: IProperties[];
}
