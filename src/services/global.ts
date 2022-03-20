import request from '@/utils/request';

/**
 * 获取自定义列配置
 * @param userId
 */
export async function fetchColumnsAction(userId: number) {
  return request.v1.get(`/users/${userId}/expand`);
}
