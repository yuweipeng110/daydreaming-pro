import request from '@/utils/request';

export async function queryUserIntegralRankStatisticsListApi(params?: any) {
  return request.get('/app/statistics/get-user-integral-rank-statistics-list', {
    params
  });
}
