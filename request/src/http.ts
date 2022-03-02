import {
  IBuilderParamsType,
  ILCBaseConfiguration,
  ILCExtraConfiguration,
  ILCSuccessParam,
  LifeCycle
} from '@vbs/mini-request-utils';
import { my as __my__, wx as __wx__ } from './client';
import { transformRequestSendDefault } from './transform';

/**
 * 小程序HTTP 请求生命周期封装
 * @example
 *    `const http = new Http({ baseURL: 'https://reqbin.com/echo/get/json', retry: 3 });`
 * @template TExt 扩展参数属性类型
 */
export class Http<TExt extends {} = {}> extends LifeCycle<
  TExt & __wx__.RequestOption,
  __wx__.RequestTask,
  RequestInit<TExt>,
  FullRequestOption<TExt>
> {
  /**
   * 新建 Http实列
   * @param config 全局默认配置
   * @param request 请求处理方法，默认使用请求队列处理
   * @param listeners 请求事件监听
   */
  public constructor(
    config?: RequestInit<TExt>,
    request?: (o: TExt & __wx__.RequestOption) => __wx__.RequestTask,
    listeners?: Http<TExt>['Listeners']
  ) {
    super(
      // tslint:disable-next-line: no-use-before-declare
      request || __wx__.request,
      // tslint:disable-next-line: no-object-literal-type-assertion
      config ||
        ({ transformSend: transformRequestSendDefault } as RequestInit<TExt>),
      listeners
    );
  }

  /**
   * Object 参数发起请求
   * @param options 每个请求的全部配置信息，未设置内容使用默认全局配置
   * @template TReturn Promise 返回的格式类型,默认返回微信原始返回数据格式
   * @template TData request请求参数的格式类型,默认 any
   * @template TParams 路径参数(如`/items/{id}`或者`/{0}/{1}`)的格式类型,默认 任意object或数组
   */
  public request<
    TReturn = ILCSuccessParam<__wx__.RequestOption>,
    TData extends BaseData = BaseData,
    TParams = IBuilderParamsType
  >(options: RequestOption<TData, TParams, TExt, TReturn>): Promise<TReturn>;
  /**
   * 发送一个 request请求
   * @param method 操作方法，和小程序一致
   * @param action 请求操作URL,支持{name}格式参数
   * @param data 可转未query string
   * @param config 可覆盖默认配置
   * @template TReturn Promise 返回的格式类型,默认返回微信原始返回数据格式
   * @template TData request请求参数的格式类型,默认 any
   * @template TParams 路径参数(如`/items/{id}`或者`/{0}/{1}`)的格式类型,默认 任意object或数组
   */
  public request<
    TReturn = ILCSuccessParam<__wx__.RequestOption>,
    TData extends BaseData = BaseData,
    TParams = IBuilderParamsType
  >(
    method: NonNullable<__wx__.RequestOption['method']>,
    action: string,
    data?: TData,
    config?: RequestConfig<TParams, TExt, TReturn>
  ): Promise<TReturn>;
  public request<
    TReturn = ILCSuccessParam<__wx__.RequestOption>
  >(): Promise<TReturn> {
    const argNum = arguments.length;
    // tslint:disable-next-line: no-unsafe-any
    const options: FullRequestOption<TExt> =
      argNum === 1 ? arguments[0] : arguments[3] || {};
    if (argNum > 1) {
      options.method = arguments[0] as FullRequestOption['method'];
      options.url = arguments[1] as string;
      if (argNum > 2) {
        // tslint:disable-next-line: no-unsafe-any
        options.data = arguments[2];
      }
    }
    return this.process(options);
  }

  /**
   * GET 操作
   * @param action 请求操作URL,支持{name}格式参数
   * @param data 可转为query string
   * @param config 可覆盖默认配置
   * @template TReturn Promise 返回的格式类型,默认返回微信原始返回数据格式
   * @template TData get query data请求参数的格式类型,默认 any
   * @template TParams 路径参数(如`/items/{id}`或者`/{0}/{1}`)的格式类型,默认 任意object或数组
   */
  // tslint:disable-next-line: no-reserved-keywords
  public get<
    TReturn = ILCSuccessParam<__wx__.RequestOption>,
    TData extends BaseData = BaseData,
    TParams = IBuilderParamsType
  >(
    action: string,
    data?: TData,
    config?: RequestConfig<TParams, TExt, TReturn>
  ): Promise<TReturn> {
    return this.request<TReturn>('GET', action, data, config);
  }

  /**
   * POST 操作
   * @param action 请求操作URL,支持{name}格式参数
   * @param data 操作数据,默认会以json方式上传
   * @param config 可覆盖默认配置
   * @template TReturn Promise 返回的格式类型,默认返回微信原始返回数据格式
   * @template TData post data参数格式类型,默认 any
   * @template TParams 路径参数(如`/items/{id}`或者`/{0}/{1}`)的格式类型,默认 任意object或数组
   */
  public post<
    TReturn = ILCSuccessParam<__wx__.RequestOption>,
    TData extends BaseData = BaseData,
    TParams = IBuilderParamsType
  >(
    action: string,
    data?: TData,
    config?: RequestConfig<TParams, TExt, TReturn>
  ): Promise<TReturn> {
    return this.request<TReturn>('POST', action, data, config);
  }

  /**
   * PUT 操作
   * @param action 请求操作URL,支持{name}格式参数
   * @param data 操作数据,默认会以json方式上传
   * @param config 可覆盖默认配置
   * @template TReturn Promise 返回的格式类型,默认返回微信原始返回数据格式
   * @template TData post data数据格式类型,默认 any
   * @template TParams 路径参数(如`/items/{id}`或者`/{0}/{1}`)的格式类型,默认 任意object或数组
   */
  public put<
    TReturn = ILCSuccessParam<__wx__.RequestOption>,
    TData extends BaseData = BaseData,
    TParams = IBuilderParamsType
  >(
    action: string,
    data?: TData,
    config?: RequestConfig<TParams, TExt, TReturn>
  ): Promise<TReturn> {
    return this.request<TReturn>('PUT', action, data, config);
  }

  /**
   * DELETE 操作
   * @param action 请求操作URL,支持{name}格式参数
   * @param data 可转为query string
   * @param config 可覆盖默认配置
   * @template TReturn Promise 返回的格式类型,默认返回微信原始返回数据格式
   * @template TData put query data参数格式类型,默认 any
   * @template TParams 路径参数(如`/items/{id}`或者`/{0}/{1}`)的格式类型,默认 任意object或数组
   */
  // tslint:disable-next-line: no-reserved-keywords
  public delete<
    TReturn = ILCSuccessParam<__wx__.RequestOption>,
    TData extends BaseData = BaseData,
    TParams = IBuilderParamsType
  >(
    action: string,
    data?: TData,
    config?: RequestConfig<TParams, TExt, TReturn>
  ): Promise<TReturn> {
    return this.request<TReturn>('DELETE', action, data, config);
  }

  /**
   * HEAD 操作
   * @param action 请求操作URL,支持{name}格式参数
   * @param data 可转为query string
   * @param config 可覆盖默认配置
   * @template TReturn Promise 返回的格式类型,默认返回微信原始返回数据格式
   * @template TData head query data参数格式类型,默认 any
   * @template TParams 路径参数(如`/items/{id}`或者`/{0}/{1}`)的格式类型,默认 任意object或数组
   */
  public head<
    TReturn = ILCSuccessParam<__wx__.RequestOption>,
    TData extends BaseData = BaseData,
    TParams = IBuilderParamsType
  >(
    action: string,
    data?: TData,
    config?: RequestConfig<TParams, TExt, TReturn>
  ): Promise<TReturn> {
    return this.request<TReturn>('HEAD', action, data, config);
  }

  /**
   * Patch 操作
   * 由于小程序不支持PATCH 方法
   * 采用X-HTTP-Method-Override兼容处理，需要服务器端支持
   * @param action 请求操作URL,支持{name}格式参数
   * @param data 操作数据,默认会以json方式上传
   * @param config 可覆盖默认配置
   * @template TReturn Promise 返回的格式类型,默认返回微信原始返回数据格式
   * @template TData patch data参数格式类型,默认 any
   * @template TParams 路径参数(如`/items/{id}`或者`/{0}/{1}`)的格式类型,默认 任意object或数组
   */
  public patch<
    TReturn = ILCSuccessParam<__wx__.RequestOption>,
    TData extends BaseData = BaseData,
    TParams = IBuilderParamsType
  >(
    action: string,
    data?: TData,
    config?: RequestConfig<TParams, TExt, TReturn>
  ): Promise<TReturn> {
    if (!config) {
      // tslint:disable-next-line: no-parameter-reassignment
      config = {
        headers: { 'X-HTTP-Method-Override': 'PATCH' }
      } as unknown as RequestConfig<TParams, TExt, TReturn>;
    } else if (!config.headers) {
      config.headers = { 'X-HTTP-Method-Override': 'PATCH' };
    } else {
      config.headers['X-HTTP-Method-Override'] = 'PATCH';
    }
    return this.request<TReturn>('POST', action, data, config);
  }
}

/**
 * Request Data支持的全部数据格式
 */
type BaseData = string | object | ArrayBuffer | undefined;
/**
 * 构造函数 默认配置信息
 * (创建Request的配置信息)
 */
export interface RequestInit<T extends {} = {}, TReturn = any>
  extends ILCBaseConfiguration<
    FullRequestOption<T>,
    T & __wx__.RequestOption,
    TReturn
  > {
  /**
   * response data type
   */
  responseType?: 'json' | 'text' | 'arraybuffer';
}

/**
 * 单个请求的额外配置信息
 * @template TParams 参数类型
 * @template TExt 扩展配置
 */
export type RequestConfig<
  TParams = IBuilderParamsType,
  TExt extends {} = {},
  TReturn = __wx__.HttpResponse | __my__.HttpResponse
> = Partial<TExt> &
  Partial<RequestInit<TExt, TReturn> & ILCExtraConfiguration> & {
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
    params?: TParams;
  };

interface UniqueRequestOption<TData> {
  /**
   * 请求的地址
   */
  url: string;

  /**
   * 请求方法
   * HTTP request mthod: GET POST ...
   */
  method?: __wx__.RequestOption['method'];

  /**
   * 请求数据
   * reqeust data
   *  * **data 数据说明：**
   *
   * 最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String 。转换规则如下：
   *
   * *   对于 `GET` 方法的数据，会将数据转换成 query string（encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）
   * *   对于 `POST` 方法且 `header['content-type']` 为 `application/json` 的数据，会对数据进行 JSON 序列化
   * *   对于 `POST` 方法且 `header['content-type']` 为 `application/x-www-form-urlencoded` 的数据，会将数据转换成 query string
   * （encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）
   */
  data?: TData;

  // onProgress?: __wx__.DownloadTask['offProgressUpdate']
}

/**
 * 每个HTTP Request请求的全部可配置信息
 * @template TData 数据data的类型限制
 * @template TParams 参数类型
 * @template TExt 扩展信息
 */
export type RequestOption<
  TData extends BaseData = BaseData,
  TParams = IBuilderParamsType,
  TExt extends {} = {},
  TReturn = __wx__.HttpResponse | __my__.HttpResponse
> = RequestConfig<TParams, TExt, TReturn> & UniqueRequestOption<TData>;
/**
 * 发送一个请求的完整可配置信息
 * @template TExtend 扩展信息
 * @template TData 数据data的类型限制
 */
export interface FullRequestOption<
  TExtend extends {} = {},
  TData extends BaseData = BaseData,
  TReturn extends any = any
> extends RequestInit<TExtend, TReturn>,
    ILCExtraConfiguration,
    UniqueRequestOption<TData> {}
