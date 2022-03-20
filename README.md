# umi project

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

## 目录结构

```JavaScript
├── config/
    ├── config.ts                  // umi 配置，同 .umirc.js，二选一
├── dist/                          // 默认的 build 输出目录
├── mock/                          // mock 文件所在目录，基于 express
├── public/                        // 全局相对路径文件
└── src/                           // 源码目录，可选
    ├── .umi/                      // dev 临时目录，需添加到 .gitignore
    ├── hooks/                     // 全局共用自定义hook
    ├── assets/                    // 静态文件
    ├── components/                // 全局共用组件
    ├── layouts/index.tsx          // 全局入口文件
    ├── models/                    // 全局models文件，存放全局共用数据store
    ├── pages/                     // 页面目录，业务组件
        ├── histroy-records/       // 历史记录-业务模块
            ├── components/        // 历史记录-局部公共组件
            ├── models/            // 历史记录-局部models，存放histroy-records的store
            ├── services/          // 历史记录-局部services，存放histroy-records的接口
            ├── index.tsx          // 业务组件index
            ├── page.tsx           // 业务组件page
            ├── _layout.tsx        // 局部入口文件,约定式路由时，pages下有_layout会优先经过_layout组件
        ├── 404.ts                 // 404 页面
    ├── services/                  // 全局services文件，存放全局公共接口
    ├── utils/                     // 全局工具类
        ├── request.ts             // ajax请求库封装
    ├── global.css                 // 约定的全局样式文件，自动引入，也可以用 global.less
    ├── global.ts                  // 约定的全局Js文件，自动引入，可以在这里加入 polyfill
    ├── app.ts                     // 运行时配置文件,getInitialState方法里请求接口，暴露初始数据
├── typings.d.ts                   // 定义全局常量和接口变量           
├── .umirc.js                      // umi 配置，同 config/config.js，二选一
├── .env                           // 环境变量
└── package.json
```

## 路由
### 1.约定式路由
1.1 umi约定，在pages目录下的.js/.jsx会自动生成路由，除开在配置文件plugins/routes中被exclude的目录或文件，文件的路径即路由。
1.2 src/layout/为全局layout，默认全局入口文件，配置式路由下无效。pages/下任何文件下的_layout.js即当前文件夹路由下的入口文件，必须先经过_layout.js才能进入当前文件夹路由
### 2.配置式路由
在配置文件 .umirc.(ts|js) 或者 config/config.(ts|js)中引入：
```JavaScript
export default {
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/user', redirect: '/user/login' },//redirect,避免只渲染_layout.js
        { path: '/user/login', component: './user/login' },
        {
          path: '/manager', component: '../pages/management/_layout.js',
          routes: [
            { path: '/manager/system', component: '../pages/management/manager/system', Routes: ['./routes/PrivateRoute.js'] }
        }
      ],
    },
  ],
};
```
### 3.权限路由
路由通过Routes属性来实现权限路由,如上文：/manager/system路由。创建一个./routes/PrivateRoute.js 权限文件，props里会传入/manager/system的路由信息。
```JavaScript
export default (props) => {
  return (
    <div>
      <div>PrivateRoute (routes/PrivateRoute.js)</div>
      { props.children }
    </div>
  );
}
```

### 4.跳转路由
link方式
```JavaScript
  import Link from 'umi/link';
  <Link to="/list">Go to list page</Link> 
```
router方式
```JavaScript
  import router from 'umi/router';
  router.push({
    pathname: '/list',
    query: {
      a: 'b',
    },
  });
```

## models层
### useModel
官方：useModel 是一个 Hook，提供消费 Model 的能力，使用示例如下：
```typescript
import { useModel } from 'umi';

export default () => {
  const { user, fetchUser } = useModel('user', model => ({ user: model.user, fetchUser: model.fetchUser }));
  return <>hello</>
};
```
> useModel 有两个参数，namespace 和 updater。
namespace - 就是 hooks model 文件的文件名，如上面例子里的 useAuthModel
updater - 可选参数。在 hooks model 返回多个状态，但使用组件仅引用了其中部分状态，并且希望仅在这几个状态更新时 rerender 时使用（性能相关）

* @@initialState方式
```typescript
// 定义：入口文件app.ts中，使用getInitialState返回初始值
// app.ts
/**
 * 初始化用户数据
 * 注：这里可以增加其它基本数据
 */
export async function getInitialState() {
  ...
  return {
    user,
    permissiones,
    authInfo,
  };
}

// 使用：通过useModel('@@initialState')获取getInitialState返回的值
// 例子：
const AllPermissions = useModel(
    '@@initialState',
    (state) => new Set(state.initialState?.permissiones),
  );
// 例子：
const { 
  initialState,  // getInitialState 的返回值
  loading, // getInitialState 是否处于 loading 状态
  error, // 当运行时配置中，getInitialState throw Error 时，会将错误储存在 error 中
  refresh, // 重新执行 getInitialState 方法，并获取新数据
  setInitialState //手动设置 initialState 的值
  } = useModel('@@initialState');
```

* 普通model方式
```typescript
// 定义，src/models/common.ts，models下的文件名默认为useModel的namespace
import { useState } from 'react';
export default function useCommonModel() {
  const [siderMenuCollapsed, setSiderMenuCollapsed] = useState(false);
  return {
    siderMenuCollapsed,
    setSiderMenuCollapsed,
  };
}

// 使用
import { useModel } from 'umi';
const { siderMenuCollapsed } = useModel('common');
```


### dva   
models/index.js，不能空文件。由于umi/dva是基于redux，redux-saga的数据流方案，dva的connect即redux的connect，dva的model即redux-saga简化版，更易用。
```JavaScript
import * as services from '../services';
{
  namespace: 'histroyRecords', //models命名空间，需全局唯一
  state: {
    planList: [],              //models存储的数据store
  },              
  reducers: {
    save(state, { payload }) {          //更新store，用新数据合并state的旧数据
      return { ...state, ...payload };
    }
  },
  effects: {
    * testFunc({ payload: params }, { call, put, select }) {   //dispatch请求的方法
      const { dataList } = yield select(state => state.system); //获取models中的state
      const { data } = yield call(services.testFunc, params);  //call,请求services里面的接口以及传参，可继续往后面加参数，跟JavaScript的call一样
      if (data && data.code == 0) {
        const data_ = data.data.content;
        yield put({ //put,必须发出action save，此action被reducer监听，从而达到更新state数据的目的
          type: 'save',                                        
          payload: {
            dataList: data_ || []
          }
        });
        return data_;   //返回response，可选
      }                                                        
    },
  },
  subscriptions: {      //订阅，在app.start()即启动项目时被执行
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        // 进入 '/manager/system' 路由，会发起一个名叫 'save' 的 effect
        if (pathname === '/manager/system') {
					//do sth... dispatch({ type: 'save', payload: query });
				}
      })
    }
  }
}
```

```
* 接口请求
> 方式一(推荐)： 使用dispatch调用models里面effects/reducer声明的方法,
```JavaScript
this.props.dispatch({
  type: 'system/testFunc',   //type，命名空间/effects方法名
  payload: params,           //payload，参数
}).then(res => {})

> 方式二：dispatch带callback回调函数作为第三个参数
```JavaScript
//组件中
this.props.dispatch({
  type: 'system/testFunc',
  payload: params,
  callback: (res) => {
    if (!!res) {
      //do sth
    }
  }
});

//model中
*testFunc({ payload, callback }, { call, put }){
  const { data } = yield call(services.rightSave, payload);
  if (data && data.code == 0) {
    !!callback && && callback(data);
  }
}

```

## services层
请求后台接口的方法，返回一个promise对象。
```JavaScript
import request from '@utils/request';

export function rightSave(values) {
  return request(`/authirty/right/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}
```

## connect
> 方式一：mapStateToProps，class继承组件和函数组件都能用这种

接口请求完后，组件中引入connect，获取models的数据放入当前组件props中
```JavaScript
import { connect } from 'dva'; 
//或者直接解构
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

```

> 方式二：es6注解方式引入，只能用于class继承组件
```JavaScript
@connect(({ system, global: {organizationList} }) => ({ 
  ...system,
  organizationList
}))
class System extends React.Component{render(){return {<></>}}}
```
