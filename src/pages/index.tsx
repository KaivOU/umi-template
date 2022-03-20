import styles from './index.less';

interface Itest {
  a: boolean;
}

export default function IndexPage() {
  const aaB = 1;
  return (
    <div>
      <h1 className={styles.title}>
        Page{aaB} <i className={styles.index}>index</i>
      </h1>
    </div>
  );
}
