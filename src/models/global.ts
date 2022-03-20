import { Effect, Reducer, Subscription } from 'umi';

import { fetchColumnsAction } from '@/services/global';

import { ConnectState } from './connect.d';

export interface GlobalModelState {
  collapsed: boolean;
  name: string;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    fetchNotices: Effect;
  };
  reducers: {
    save: Reducer<GlobalModelState>;
  };
  subscriptions: { setup: Subscription };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    collapsed: false,
    name: 'okj',
  },

  effects: {
    *fetchNotices({ payload }, { call, put, select }) {
      const data = yield call(fetchColumnsAction, payload);
      const realName: number = yield select((state: ConnectState) => state.global.name);
      yield put({
        type: 'save',
        payload: {
          collapsed: data.length,
          realName,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        // 所有路由变化都会经过，需判断路由执行
        // if (pathname.startsWith('/price-dispose')) {
        //   dispatch({ type: 'getPriceConfigType', payload: {} });
        // }
      });
    },
  },
};

export default GlobalModel;
