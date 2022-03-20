import { Effect, Reducer } from 'umi';

import * as services from './service';
import { ISearchList } from './typing';

export interface StateType {
  searchList: ISearchList[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    getSearchList: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'histroyRecords',
  state: {
    searchList: [],
  },
  effects: {
    *getSearchList({ payload }, { call, put }) {
      // const { dataList } = yield select(state => state.system); //获取models中的state
      const { response, data } = yield call(services.searchList, payload);
      if (data && data.code === 200) {
        yield put({
          type: 'save',
          payload: {
            searchList: data?.data,
          },
        });
      }
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
};

export default Model;
