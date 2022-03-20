import React from 'react';

import styles from './index.less';

const BasicLayout: React.FC = (props) => {
  return (
    <div className={styles.container}>
      <a>主入口</a>
      {props.children}
    </div>
  );
};

export default BasicLayout;
