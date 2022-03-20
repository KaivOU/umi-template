// import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React from 'react';
import { connect, Dispatch } from 'umi';

import styles from './index.less';
import { StateType } from './model';

const { Search } = Input;
interface HistoryRecordsProps {
  dispatch: Dispatch;
  histroyRecords: StateType;
  loading: boolean;
  [propName: string]: any;
}

const HistoryRecords: React.FC<HistoryRecordsProps> = ({ dispatch, histroyRecords, loading }) => {
  const { searchList } = histroyRecords;

  const handleSearch = (value: string) => {
    if (!value) {
      return;
    }
    dispatch({
      type: 'histroyRecords/getSearchList',
      payload: {
        params: {
          query: value,
        },
      },
    });
  };
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <Search
          placeholder="请输入搜索内容"
          allowClear
          enterButton
          size="large"
          defaultValue="优惠券"
          onSearch={handleSearch}
        />
      </div>
      <ul className={styles.list}>
        {searchList.map((item) => (
          <li key={item.title + item.key}>{item.type}</li>
        ))}
      </ul>
    </div>
  );
};

export default connect(
  ({
    histroyRecords,
    loading,
  }: {
    histroyRecords: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    histroyRecords,
    loading: loading.effects['histroyRecords/getUser'],
  }),
)(HistoryRecords);
