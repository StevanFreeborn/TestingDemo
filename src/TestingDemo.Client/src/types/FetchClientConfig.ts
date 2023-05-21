export type FetchClientConfig = {
  authHeader: HeadersInit | undefined;
  unauthorizedResponseHandler: (originalRequest: Request) => Promise<Response>;
};
