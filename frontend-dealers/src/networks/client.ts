type ApiOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  next?: NextFetchRequestConfig;
  params?: Record<string, string | number | boolean | undefined>;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiClient<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const { method = "GET", body, headers = {}, next, params } = options;

  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  let url = `${BASE_URL}/${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    url += `?${searchParams.toString()}`;
  }
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    // credentials: "include",
    next,
  });

  if (!res.ok) {
    let errorData;
    try {
      errorData = await res.json();
    } catch {
      errorData = { message: res.statusText };
    }

    throw {
      status: res.status,
      message: errorData?.message || "Something went wrong",
      data: errorData,
    };
  }

  if (res.status === 204) {
    return {} as T;
  }

  return res.json();
}
