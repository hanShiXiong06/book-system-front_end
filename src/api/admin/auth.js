import { post } from "@/utils/request";

export const login = (params) => {
  return post("/admin/auth/login", params);
};
