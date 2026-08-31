import api from "@/core/api/api";

export const authService = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (details) => api.post("/auth/register", details),
};
