
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

// ======================================================
// API REQUEST
// ======================================================

export async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {

  // ====================================================
  // TOKEN
  // ====================================================

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  // ====================================================
  // URL
  // ====================================================

  const normalizedBaseUrl =
    API_BASE_URL.replace(/\/+$/, "");

  const normalizedEndpoint =
    endpoint.startsWith("/")
      ? endpoint
      : `/${endpoint}`;

  const url =
    `${normalizedBaseUrl}${normalizedEndpoint}`;

  // ====================================================
  // CHECK FOR FORMDATA
  // ====================================================

  const isFormData =
    typeof FormData !== "undefined" &&
    options.body instanceof FormData;

  // ====================================================
  // HEADERS
  // ====================================================

  const headers = new Headers(
    options.headers
  );

  headers.set(
    "Accept",
    "application/json"
  );

  // IMPORTANT:
  // Do NOT manually set Content-Type for FormData.
  //
  // Browser automatically creates:
  //
  // multipart/form-data;
  // boundary=-------------------------
  //
  // For normal JSON requests we set it manually.

  if (
    options.body &&
    !isFormData &&
    !headers.has("Content-Type")
  ) {
    headers.set(
      "Content-Type",
      "application/json"
    );
  }

  // ====================================================
  // JWT
  // ====================================================

  if (token) {
    headers.set(
      "Authorization",
      `Bearer ${token}`
    );
  }

  // ====================================================
  // DEBUG REQUEST
  // ====================================================

  console.log(
    "================================"
  );

  console.log(
    "API REQUEST"
  );

  console.log(
    "URL:",
    url
  );

  console.log(
    "METHOD:",
    options.method || "GET"
  );

  console.log(
    "TOKEN:",
    token ? "YES" : "NO"
  );

  console.log(
    "BODY:",
    isFormData
      ? "FormData"
      : options.body
      ? "JSON"
      : "None"
  );

  // ====================================================
  // FORM DATA DEBUG
  // ====================================================

  if (isFormData) {

    const formData =
      options.body as FormData;

    for (
      const [key, value]
      of formData.entries()
    ) {

      if (value instanceof File) {

        console.log(
          `${key}:`,
          {
            name: value.name,
            type: value.type,
            size: value.size,
          }
        );

      } else {

        console.log(
          `${key}:`,
          value
        );
      }
    }
  }

  console.log(
    "================================"
  );

  // ====================================================
  // FETCH
  // ====================================================

  const response = await fetch(
    url,
    {
      ...options,
      headers,
    }
  );

  // ====================================================
  // PARSE RESPONSE
  // ====================================================

  let data: unknown = null;

  try {

    const contentType =
      response.headers.get(
        "content-type"
      );

    if (
      contentType?.includes(
        "application/json"
      )
    ) {

      data =
        await response.json();

    } else {

      const text =
        await response.text();

      data =
        text.trim() !== ""
          ? text
          : null;
    }

  } catch (error) {

    console.error(
      "RESPONSE PARSE ERROR:",
      error
    );

    data = null;
  }

  // ====================================================
  // DEBUG RESPONSE
  // ====================================================

  console.log(
    "STATUS:",
    response.status
  );

  console.log(
    "RESPONSE:",
    data
  );

  console.log(
    "================================"
  );

  // ====================================================
  // ERROR
  // ====================================================

  if (!response.ok) {

    let message =
      `HTTP ${response.status}`;

    if (
      data &&
      typeof data === "object"
    ) {

      const errorData =
        data as {
          message?: string;
          error?: string;
          errors?: unknown;
        };

      if (
        typeof errorData.message ===
        "string"
      ) {

        message =
          errorData.message;

      } else if (
        typeof errorData.error ===
        "string"
      ) {

        message =
          errorData.error;

      } else if (
        Array.isArray(
          errorData.errors
        )
      ) {

        message =
          errorData.errors
            .map((errorItem) => {

              if (
                errorItem &&
                typeof errorItem ===
                  "object"
              ) {

                const error =
                  errorItem as {
                    msg?: string;
                    message?: string;
                  };

                return (
                  error.msg ||
                  error.message ||
                  JSON.stringify(
                    errorItem
                  )
                );
              }

              return String(
                errorItem
              );
            })
            .join(", ");

      } else {

        message =
          JSON.stringify(data);
      }

    } else if (
      typeof data === "string" &&
      data.trim() !== ""
    ) {

      message =
        data;
    }

    console.error(
      "API ERROR:",
      message
    );

    throw new Error(message);
  }

  // ====================================================
  // SUCCESS
  // ====================================================

  return data as T;
}