import axios from 'axios';
type ResponseType<T> = {
    code: number,
    data: T,
    msg: string
}
const statusCode: { [key in string]: string } = {
    100: "continue",
    101: "switching protocols",
    102: "processing",
    200: "ok",
    201: "created",
    202: "accepted",
    203: "non-authoritative information",
    204: "no content",
    205: "reset content",
    206: "partial content",
    207: "multi-status",
    208: "already reported",
    226: "im used",
    300: "multiple choices",
    301: "moved permanently",
    302: "found",
    303: "see other",
    304: "not modified",
    305: "use proxy",
    307: "temporary redirect",
    308: "permanent redirect",
    400: "bad request",
    401: "unauthorized",
    402: "payment required",
    403: "forbidden",
    404: "not found",
    405: "method not allowed",
    406: "not acceptable",
    407: "proxy authentication required",
    408: "request timeout",
    409: "conflict",
    410: "gone",
    411: "length required",
    412: "precondition failed",
    413: "payload too large",
    414: "uri too long",
    415: "unsupported media type",
    416: "range not satisfiable",
    417: "expectation failed",
    418: "I'm a teapot",
    422: "unprocessable entity",
    423: "locked",
    424: "failed dependency",
    426: "upgrade required",
    428: "precondition required",
    429: "too many requests",
    431: "request header fields too large",
    500: "internal server error",
    501: "not implemented",
    502: "bad gateway",
    503: "service unavailable",
    504: "gateway timeout",
    505: "http version not supported",
    506: "variant also negotiates",
    507: "insufficient storage",
    508: "loop detected",
    510: "not extended",
    511: "network authentication required",
}
export const api = axios.create({ //我自己服务器的api
    baseURL: process.env.NODE_ENV === 'development' ? "/api" : "",
    responseType: 'json'
})
const base = axios.create({ //我自己服务器的api
    baseURL: process.env.NODE_ENV === 'development' ? "/api" : "",
    responseType: 'json'
})

base.interceptors.request.use(
    config => config,
    err => {
        console.warn("ajax请求超时！");
        return Promise.reject(err);
    }
)

base.interceptors.response.use(
    res => {
        const { code } = res.data as ResponseType<any>;
        if (code !== undefined && code === 0) {
            return res.data;
        }
        console.warn("ajax数据已得，但是响应code出错:", res);
        return Promise.reject(res);
    },
    err => {
        const status = err.response.status;
        if (status) {
            const message = statusCode[status] || "未知状态码";
            console.warn(`${status} 错误响应，响应信息：${message}`, err)
        } else {
            console.warn("发生了未知错误", err);
        }
        return Promise.reject(err);
    }
)

export function get<T>(url: string, params = {}): Promise<T> {
    return base.get<T>(url, {
        params
    }).then(({ data }) => data)
}

export function post<T>(url: string, params = {}): Promise<T> {
    return base.post<T>(url, params).then(({ data }) => data)
}