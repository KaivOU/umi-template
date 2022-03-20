/**
 * @Description: use-query
 * @Author: 张福浩 <zhangfuhao@mininglamp.com>
 * @Date: 2021-03-16 11:43:00
 * @LastEditor: 张福浩 <zhangfuhao@mininglamp.com>
 * @LastEditTime: 2021-03-16 11:43:00
 */
import { useState } from 'react';
import { history } from 'umi';

export interface TQuery {
  [k: string]: string | number | undefined;
}

const useQuery = () => {
  const { pathname, query: routeQuery } = history.location;
  const [query, setQuery] = useState<TQuery>(routeQuery);
  const onQuery = (params: TQuery) => {
    const newQuery = { ...query, ...params };
    setQuery({ ...query, ...params });

    history.push({
      pathname,
      query: newQuery,
    });
  };

  return {
    query,
    setQuery: onQuery,
  };
};

export default useQuery;
