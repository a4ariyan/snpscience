// Global shared types and environment definitions

export type ApiResponse<T> = {
  data: T;
  error?: string;
};
