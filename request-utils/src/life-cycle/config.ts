import { Omit } from "../configuration";
import CancelToken from "../cancel-token";
import { IBuilderGeneralCallbackResult, IBuilderParamsType } from "../builder";

type KeyBasicValuePair = Record<
  string,
  string | number | boolean | null | undefined
>;
type PromiseOrValue<T> = T | PromiseLike<T>;

export interface WxTask {
  abort(): void;
  /** HTTP Response Header 事件的回调函数 */
  onHeadersReceived(callback: ILCExtraConfiguration["onHeadersReceived"]): void;
  /** 下载进度变化事件的回调函数 */
  onProgressUpdate?(callback: ILCExtraConfiguration["onProgressUpdate"]): void;
}

export interface WxOptions {
  /** 开发者服务器接口地址 */
  url: string;
  /** http headers */
  header?: object;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  complete?: Function;
  /** 接口调用失败的回调函数 */
  fail?: Function;
  /** 接口调用成功的回调函数 */
  success?(res: any): any;
}

export type ILCSuccessParam<T extends WxOptions> = Parameters<
  NonNullable<T["success"]>
>[0];
/**
 * 所有网络请求的集成类型,可全局配置
 */
export interface ILCBaseConfiguration<
  TFullOptions extends ILCBaseConfiguration<TFullOptions, TWxOptions>, //完整配置
  TWxOptions extends WxOptions, // 微信请求参数类型
  TRetrun = any
> {
  /**
   * 请求的根目录
   * The root URL for request
   * 如果URL以`http://`或者`https://`开头将被忽略
   */
  baseURL?: string;

  /**
   * 自定义请求头
   * user defined HTTP headers
   */
  headers?: KeyBasicValuePair;

  /**
   * 路径参数
   * URL Path Params
   * the path parameters to be replace in path
   * Must be a plain `object` or `array`
   * @example
   *  url = "/{ID}/status"
   *  param = {ID: 12345}
   *  request url will be /1234/status
   */
  params?: IBuilderParamsType;

  /**
   * 重试`次数`或重试`回调函数`
   * 处理函数(`this`指向整个参数)，参数为`发送完整数据`,`失败原因`,返回`重试数据`支持异步操作(返回Promise)
   * retry times or retry callback when fail
   * sync or asynchronous
   */
  retry?:
    | number
    /**
     * 自定义重试函数
     * @this TFullOptions 可访问整个Options对象
     * @param data request/downloadFile等完整参数
     * @param reason 本次请求发送失败的原因
     * @returns 返回新的request/downloadFile数据
     */
    | ((
        this: TFullOptions,
        data: TWxOptions,
        reason?: IBuilderGeneralCallbackResult
      ) => PromiseOrValue<TWxOptions>);

  /**
   * 是否记录时间戳
   * 如果传入为object 则记录时间戳于此object中
   */
  timestamp?: boolean | { send?: number; response?: number };

  /**
   * 禁用在线检查功能，离线状态也强制发送请求
   * 默认，会检查在线状态，离线或者后台时暂停发送
   */
  disableOnline?: boolean;

  /**
   * 请求参数预处理
   * 修改数据或者头;返回 wx.request, wx.downloadFile,wx.uploadFile参数 (不包括回调函数)
   * 支持异步返回promise
   * You can modify the data or headers object before it is sent.
   * @param options 不包含转换函数的所有配置内容
   * @returns the params to call wechat API without callback functions.
   */
  transformSend(
    options: TFullOptions
  ): PromiseOrValue<Omit<TWxOptions, "complete" | "success" | "fail">>;

  /**
   * 返回数据修改，返回值作为then的输入, throw exception 抛给catch
   * 异步返回Promise
   * allows changes to the response data to be made before it is passed to then/catch
   * @example `res=>res.data`
   * @param res wechat API result
   * @param options full options of the API
   * @return the data to resolve
   */
  transformResponse?(
    res: ILCSuccessParam<TWxOptions>,
    options: TFullOptions
  ): PromiseOrValue<TRetrun>;
}

/**
 * 每个操包含的额外配置参数
 */
export interface ILCExtraConfiguration {
  /**
   * 取消操作的 CancelToken
   * `CancelToken.source()`可生成tokenSource
   */
  cancelToken?: CancelToken;

  /**
   * 自定义超时时间,单位`ms`
   * 取值`>0` 时有有效
   */
  timeout?: number;

  /**
   * 进度回调
   */
  onProgressUpdate?: Function;

  /**
   * 接收到响应头回调
   */
  onHeadersReceived?(result: { header: object }): void;
}

/**
 * 合并配置
 * @param customize 自定义配置，未定义的将被设置为默认值
 * @param defaults 默认值
 */
export function mergeConfig<
  T1 extends Partial<T2>,
  T2 extends { [key: string]: any }
>(customize: T1, defaults: T2): T1 {
  const config = { ...defaults, ...customize };
  if (defaults.headers && customize.headers) {
    // 合并headers
    (config as any as { headers: object }).headers = {
      ...defaults.headers,
      ...customize.headers,
    };
  }
  return config;
}