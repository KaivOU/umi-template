// 约定一个地方生产和消费初始化数据, 通过useModel('@@initialState')获取
export async function getInitialState() {
  // const data = await fetchXXX();
  const data = { name: 'okj', sex: 1 };
  return data;
}
