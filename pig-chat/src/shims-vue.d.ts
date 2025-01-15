declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
  }
// declarations.d.ts

// declarations.d.ts
declare module 'crypto-js' {
  const CryptoJS: {
      HmacSHA256(message: string, key: string): any;
      enc: {
          Base64: {
              stringify(wordArray: any): string;
              parse(base64Str: string): any;
          };
      };
      // 根据需要添加其他方法和属性的声明
  };
  export = CryptoJS;
}