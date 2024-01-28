import { stringify } from "querystring";

const apiUrl = process.env.NEXT_PUBLIC_API_URL + "api";

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type HttpResponse = {
  code: number;
  data?: any;
  message: string;
  success: boolean;
};

async function httpClient<T>(
  url: string,
  method: HttpMethod,
  data?: Object,
  queryParams?: Record<string, string | number | boolean>
): Promise<HttpResponse> {
  const headers = {
    "Content-Type": "application/json",
  };

  const query = queryParams ? `?${stringify(queryParams)}` : "";

  const config = {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  };

  try {
    const response = await fetch(`${apiUrl}${url}${query}`, config);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "API 요청이 실패했습니다.");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("API 요청 에러:", error.message);
      throw error;
    } else {
      console.error("API 요청 에러:", error);
      throw new Error("알 수 없는 에러가 발생했습니다.");
    }
  }
}

const client = {
  get: async <T>(
    url: string,
    queryParams?: Record<string, string | number | boolean>
  ) => httpClient<T>(url, HttpMethod.GET, undefined, queryParams),
  post: async <T>(url: string, data?: Object) =>
    httpClient<T>(url, HttpMethod.POST, data),
  put: async <T>(url: string, data?: Object) =>
    httpClient<T>(url, HttpMethod.PUT, data),
  delete: async <T>(url: string) => httpClient<T>(url, HttpMethod.DELETE),
};

export default client;
