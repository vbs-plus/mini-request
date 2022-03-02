/// <reference lib="es5"/>
/// <reference lib="es2015.core"/>
// tslint:disable-next-line:no-import-side-effect
import '../_base/promise.finally';
interface ParamObject {
  [key: string]: string | number | boolean | null | undefined;
  [key: number]: string | number | boolean | null | undefined;
}

/**
 * 参数类型
 */
export type IBuilderParamsType = ParamObject | (string | number | boolean)[];

/**
 * 网络请求Builder工具类
 */
export default class Builder {
  /**
   * 构建url参数
   * /users/{id} ==> /users/123
   * @param url - url 相对地址或者绝对地址
   * @param params - Obejct 键值对 替换的参数列表
   * @param baseUrl - 根目录，当url以https://或者http://开头忽略此参数
   * @returns 完整参数URL
   */
  public buildParams(
    url: string,
    params?: IBuilderParamsType,
    baseUrl?: string
  ): string {
    if (url && params) {
      Object.keys(params).forEach((key) => {
        // tslint:disable-next-line:no-parameter-reassignment prefer-type-cast
        url = url.replace(
          new RegExp(`{${key}}`, 'g'),
          (params as ParamObject)[key] as string
        );
      });
    }
    // tslint:disable-next-line:no-http-string
    if (url && (url.startsWith('https://') || url.startsWith('http://'))) {
      return url;
    } else {
      return (baseUrl || '') + url;
    }
  }

  /**
   * 合并公共配置
   * @param data - new configuration for request operation
   * @param options - default global configuration
   * @param extendKeys - key need copy to data
   */
  public getCommonOptions<T extends { [key: string]: any }>(
    data: T,
    options: { [key: string]: any },
    extendKeys: (keyof T)[]
  ): T {
    (['expire', ...extendKeys] as (keyof typeof options)[]).forEach((v) => {
      if (options[v] !== undefined) {
        // tslint:disable-next-line: no-unsafe-any
        data[v as keyof T] = options[v];
      }
    });

    return data;
  }
}
