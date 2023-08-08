/* eslint-disable @typescript-eslint/naming-convention */
export const HTTP_1xx_CONTINUE = 100;
export const HTTP_1xx_SWITCHING_PROTOCOL = 101;
export const HTTP_1xx_PROCESSING = 102;
export const HTTP_1xx_EARLY_HINTS = 103;

export const HTTP_2xx_OK = 200;
export const HTTP_2xx_CREATED = 201;
export const HTTP_2xx_ACCEPTED = 202;
export const HTTP_2xx_NON_AUTHORITATIVE_INFORMATION = 203;
export const HTTP_2xx_NO_CONTENT = 204;
export const HTTP_2xx_RESET_CONTENT = 205;
export const HTTP_2xx_PARTIAL_CONTENT = 206;

export const HTTP_3xx_MULTIPLE_CHOICE = 300;
export const HTTP_3xx_MOVED_PERMANENTLY = 301;
export const HTTP_3xx_FOUND = 302;
export const HTTP_3xx_SEE_OTHER = 303;
export const HTTP_3xx_NOT_MODIFIED = 304;
export const HTTP_3xx_USE_PROXY = 305;
export const HTTP_3xx_UNUSED = 306;
export const HTTP_3xx_TEMPORARY_REDIRECT = 307;

export const HTTP_4xx_BAD_REQUEST = 400;
export const HTTP_4xx_UNAUTHORIZED = 401;
export const HTTP_4xx_PAYMENT_REQUIRED = 402;
export const HTTP_4xx_FORBIDDEN = 403;
export const HTTP_4xx_NOT_FOUND = 404;
export const HTTP_4xx_METHOD_NOT_ALLOWED = 405;
export const HTTP_4xx_NON_ACCEPTABLE = 406;
export const HTTP_4xx_PROXY_AUTHENTICATION_REQUIRED = 407;

export const HTTP_5xx_INTERNAL_SERVER_ERROR = 500;
export const HTTP_5xx_NOT_IMPLEMENTED = 501;
export const HTTP_5xx_BAD_GATEWAY = 502;
export const HTTP_5xx_SERVICE_UNAVAILABLE = 503;
export const HTTP_5xx_GATEWAY_TIMEOUT = 504;
export const HTTP_5xx_HTTP_VERSION_NOT_SUPPORTED = 505;
export const HTTP_5xx_VARIANT_ALSO_NEGOTIATES = 506;

const HTTP_CODES = [
  HTTP_1xx_CONTINUE,
  HTTP_1xx_SWITCHING_PROTOCOL,
  HTTP_1xx_PROCESSING,
  HTTP_1xx_EARLY_HINTS,
  HTTP_2xx_OK,
  HTTP_2xx_CREATED,
  HTTP_2xx_ACCEPTED,
  HTTP_2xx_NON_AUTHORITATIVE_INFORMATION,
  HTTP_2xx_NO_CONTENT,
  HTTP_2xx_RESET_CONTENT,
  HTTP_2xx_PARTIAL_CONTENT,
  HTTP_3xx_MULTIPLE_CHOICE,
  HTTP_3xx_MOVED_PERMANENTLY,
  HTTP_3xx_FOUND,
  HTTP_3xx_SEE_OTHER,
  HTTP_3xx_NOT_MODIFIED,
  HTTP_3xx_USE_PROXY,
  HTTP_3xx_UNUSED,
  HTTP_3xx_TEMPORARY_REDIRECT,
  HTTP_4xx_BAD_REQUEST,
  HTTP_4xx_UNAUTHORIZED,
  HTTP_4xx_PAYMENT_REQUIRED,
  HTTP_4xx_FORBIDDEN,
  HTTP_4xx_NOT_FOUND,
  HTTP_4xx_METHOD_NOT_ALLOWED,
  HTTP_4xx_NON_ACCEPTABLE,
  HTTP_4xx_PROXY_AUTHENTICATION_REQUIRED,
  HTTP_5xx_INTERNAL_SERVER_ERROR,
  HTTP_5xx_NOT_IMPLEMENTED,
  HTTP_5xx_BAD_GATEWAY,
  HTTP_5xx_SERVICE_UNAVAILABLE,
  HTTP_5xx_GATEWAY_TIMEOUT,
  HTTP_5xx_HTTP_VERSION_NOT_SUPPORTED,
  HTTP_5xx_VARIANT_ALSO_NEGOTIATES,
];

export type HttpCode = (typeof HTTP_CODES)[number];