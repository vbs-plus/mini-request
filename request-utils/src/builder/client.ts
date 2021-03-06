/**
 * 微信小程序请求命名空间
 */
export declare namespace wx {
  function request(option: RequestOption): RequestTask;
  interface RequestOption {
    /** 开发者服务器接口地址 */
    url: string;
    /** 响应的数据类型
     *
     * 可选值：
     * - 'text': 响应的数据为文本;
     * - 'arraybuffer': 响应的数据为 ArrayBuffer;
     *
     * 最低基础库： `1.7.0`
     */
    responseType?: 'text' | 'arraybuffer';
    /** 返回的数据格式
     *
     * 可选值：
     * - 'json': 返回的数据为 JSON，返回后会对返回的数据进行一次 JSON.parse;
     * - '其他': 不对返回的内容进行 JSON.parse;
     */
    dataType?: 'json' | '其他';
    /** HTTP 请求方法
     *
     * 可选值：
     * - 'OPTIONS': HTTP 请求 OPTIONS;
     * - 'GET': HTTP 请求 GET;
     * - 'HEAD': HTTP 请求 HEAD;
     * - 'POST': HTTP 请求 POST;
     * - 'PUT': HTTP 请求 PUT;
     * - 'DELETE': HTTP 请求 DELETE;
     * - 'TRACE': HTTP 请求 TRACE;
     * - 'CONNECT': HTTP 请求 CONNECT;
     */
    method?:
      | 'OPTIONS'
      | 'GET'
      | 'HEAD'
      | 'POST'
      | 'PUT'
      | 'DELETE'
      | 'TRACE'
      | 'CONNECT';
    /** 设置请求的 header，header 中不能设置 Referer。
     *
     * `content-type` 默认为 `application/json
     */
    header?: object;
    /**
     * 超时时间，单位为毫秒。
     *
     * 默认值为 60000
     */
    timeout?: number;
    /**
     * 请求的参数
     */
    data?: string | object | ArrayBuffer;
    /**
     * 开启 http2
     */
    enableHttp2?: boolean;
    /**
     * 开启 quic
     */
    enableQuic?: boolean;
    /**
     * 开启 缓存
     */
    enableCache?: boolean;
    /**
     * 开启 HttpDNS
     */
    enableHttpDNS?: boolean;
    /**
     * HttpDNS 服务商 Id。 HttpDNS 用法详见 移动解析HttpDNS
     */
    httpDNSServiceId?: string | boolean;
    /**
     * 开启 transfer-encoding chunked。
     */
    enableChunked?: boolean;
    /**
     *  接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(res: { errMsg: string }): void;
    /**
     *  接口调用失败的回调函数
     */
    fail?(res: { errMsg: string }): void;
    /**
     *  接口调用成功的回调函数
     */
    success?(result: HttpResponse): void;
  }
  interface RequestTask {
    /** [RequestTask.abort()](RequestTask.abort.md)
     *
     * 中断请求任务
     *
     * 最低基础库： `1.4.0`
     */
    abort(): void;

    /** [RequestTask.onHeadersReceived(function callback)](RequestTask.onHeadersReceived.md)
     *
     * 监听HTTP Response Header 事件，会比请求完成事件更早
     *
     * 最低基础库： `2.1.0`
     */
    onHeadersReceived(
      /** HTTP Response Header 事件的回调函数 */
      callback: (result?: { header: object }) => void
    ): void;
  }
  interface HttpResponse {
    /** 开发者服务器返回的 HTTP Response Header
     *
     * 最低基础库： `1.2.0`
     */
    header: object;
    /** 开发者服务器返回的 HTTP 状态码 */
    statusCode: number;
    /** 开发者服务器返回的数据 */
    data: string | object | ArrayBuffer;
    /**
     * cookie信息2.4.2以上版本有
     * 非正式支持
     */
    cookies?: (
      | {
          domain: string;
          httpOnly: boolean;
          name: string;
          path: string;
          value: string;
        }
      | string
    )[];
    /**
     * 调试信息
     */
    profile?: ResponseProfile;
    /**
     * 回调消息
     */
    errMsg?: string;
    /**
     * 是否触发了自定义超时
     */
    timeout?: boolean;
    /**
     * 是否是主动取消
     */
    cancel?: boolean;
    /**
     * 触发来源
     */
    source?: string;
  }
  interface ResponseProfile {
    /**
     * 	第一个 HTTP 重定向发生时的时间。有跳转且是同域名内的重定向才算，否则值为 0
     */
    redirectStart: number;
    /**
     * 	最后一个 HTTP 重定向完成时的时间。有跳转且是同域名内部的重定向才算，否则值为 0
     */
    redirectEnd: number;
    /**
     * 	组件准备好使用 HTTP 请求抓取资源的时间，这发生在检查本地缓存之前
     */
    fetchStart: number;
    /**
     * 	DNS 域名查询开始的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
     */
    domainLookupStart: number;
    /**
     * 	DNS 域名查询完成的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
     */
    domainLookupEnd: number;
    /**
     * 	HTTP（TCP） 开始建立连接的时间，如果是持久连接，则与 fetchStart 值相等。注意如果在传输层发生了错误且重新建立连接，则这里显示的是新建立的连接开始的时间
     */
    connectStart: number;
    /**
     * 	HTTP（TCP） 完成建立连接的时间（完成握手），如果是持久连接，则与 fetchStart 值相等。注意如果在传输层发生了错误且重新建立连接，则这里显示的是新建立的连接完成的时间。注意这里握手结束，包括安全连接建立完成、SOCKS 授权通过
     */
    connectEnd: number;
    /**
     * 	SSL建立连接的时间,如果不是安全连接,则值为 0
     */
    SSLconnectionStart: number;
    /**
     * 	SSL建立完成的时间,如果不是安全连接,则值为 0
     */
    SSLconnectionEnd: number;
    /**
     * 	HTTP请求读取真实文档开始的时间（完成建立连接），包括从本地读取缓存。连接错误重连时，这里显示的也是新建立连接的时间
     */
    requestStart: number;
    /**
     * 	HTTP请求读取真实文档结束的时间
     */
    requestEnd: number;
    /**
     * 	HTTP 开始接收响应的时间（获取到第一个字节），包括从本地读取缓存
     */
    responseStart: number;
    /**
     * 	HTTP 响应全部接收完成的时间（获取到最后一个字节），包括从本地读取缓存
     */
    responseEnd: number;
    /**
     * 	当次请求连接过程中实时 rtt
     */
    rtt: number;
    /**
     * 	评估的网络状态 unknown, offline, slow 2g, 2g, 3g, 4g, last/0, 1, 2, 3, 4, 5, 6
     */
    estimate_nettype: number;
    /**
     * 	协议层根据多个请求评估当前网络的 rtt（仅供参考）
     */
    httpRttEstimate: number;
    /**
     * 	传输层根据多个请求评估的当前网络的 rtt（仅供参考）
     */
    transportRttEstimate: number;
    /**
     * 	评估当前网络下载的kbps
     */
    downstreamThroughputKbpsEstimate: number;
    /**
     * 	当前网络的实际下载kbps
     */
    throughputKbps: number;
    /**
     * 	当前请求的IP
     */
    peerIP: string;
    /**
     * 	当前请求的端口
     */
    port: number;
    /**
     * 	使用协议类型，有效值:http1.1, h2, quic, unknown
     */
    protocol: string;
    /**
     * 	是否复用连接
     */
    socketReused: boolean;
    /**
     * 	发送的字节数
     */
    sendBytesCount: number;
    /**
     * 	收到字节数
     */
    receivedBytedCount: number;
  }
}

/**
 * 支付宝小程序请求命名空间
 */
export declare namespace my {
  function request(option: RequestOption): RequestTask;
  interface RequestOption {
    /** 开发者服务器接口地址 */
    url: string;
    /** 返回的数据格式
     *
     * 可选值：
     * - 'JSON': 返回的数据为 JSON，返回后会对返回的数据进行一次 JSON.parse;
     * - 'text': 不对返回的内容进行 JSON.parse;
     * - 'base64': base64数据;
     * - 'arraybuffer': arraybuffer数据;
     *
     * 支付宝客户端 10.1.95 或更高版本支持
     */
    dataType?: 'JSON' | 'text' | 'base64' | 'arraybuffer';
    /** HTTP 请求方法
     *
     * 可选值：
     * - 'GET': HTTP 请求 GET;
     * - 'POST': HTTP 请求 POST;
     * - 'PUT': HTTP 请求 PUT;
     * - 'DELETE': HTTP 请求 DELETE;
     *
     * 支付宝客户端 10.1.70 版本开始支持
     */
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    /** 设置请求的 header，header 中不能设置 Referer。
     *
     * `content-type` 默认为 `application/json
     */
    headers?: object;
    /**
     * 请求的参数
     *
     * ArrayBuffer 在支付宝客户端 10.1.95 或更高版本支持
     */
    data?: object | ArrayBuffer;
    /**
     * 超时时间，单位为毫秒。
     *
     * 默认值为 30000
     */
    timeout?: number;
    /**
     *  接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(result: HttpResponse): void;
    /**
     *  接口调用失败的回调函数
     */
    fail?(result: HttpResponse): void;
    /**
     *  接口调用成功的回调函数
     */
    success?(result: HttpResponse): void;
  }
  interface RequestTask {
    /**
     * 中断请求任务。调用之后会返回{"error":9,"errorMessage":"request:fail abort"}
     */
    abort(): void;
  }
  interface HttpResponse {
    /**
     * 响应头
     */
    headers: object;
    /**
     * 响应码
     */
    status: number;
    /**
     * 响应数据，格式取决于请求时的 dataType 参数
     *
     * dataType: "JSON" | "text" | "base64" | "arraybuffer";
     */
    data: string | object | ArrayBuffer;
    /**
     * 调试信息
     */
    profile?: ResponseProfile;
    /**
     * 响应错误码
     *
     * https://opendocs.alipay.com/mini/api/owycmh#%E9%94%99%E8%AF%AF%E7%A0%81
     */
    error?: number;
    /**
     * 响应错误提示
     */
    errorMessage?: string;
  }
  interface ResponseProfile {
    /**
     * 	SSL建立连接的时长,如果不是安全连接,则值为 0
     */
    SSLconnection: number;
    /**
     * 	等待时长
     */
    Waiting: number;
    /**
     * 	HTTP（TCP） 建立连接的时长
     */
    connect: number;
    /**
     * 	DNS 域名查询时长
     */
    domainLookup: number;
    /**
     * 	使用协议类型，有效值:http1.1, h2, quic, unknown
     */
    protocol: string;
    /**
     * 	是否复用连接
     */
    socketReused: boolean;
    /**
     * 	连接合计时长
     */
    totalTime: number;
  }
}
