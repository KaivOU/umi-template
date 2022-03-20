import request from '@/utils/request';

interface ParamProps {
  page?: number;
  pageSize?: number;
  sort?: string;
  keyword?: string;
  title?: string;
  creatorIds?: any;
}

// 搜索详情
export async function searchList(params: { query: string }) {
  return request.v0.get(`/koan/open/search`, params);
}

// 删除规则
// export async function deleteRule(params: { id: number }) {
//   return request.v1.delete(`/alerts/${params.id}`);
// }
