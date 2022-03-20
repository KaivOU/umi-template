declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;
  export default url;
}

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false | undefined;

// 通用接口返回类型
declare interface ApiResponse<T> {
  data: T;
  code: number;
  message: string;
}
