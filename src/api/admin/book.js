import { get, post, put, del } from "@/utils/request";

export const fetchCategory = async () => {
  return await get("/admin/category");
};

export const postCategory = async (params) => {
  return await post("/admin/category", params);
};

export const putCategory = async (id, params) => {
  return await put("/admin/category/" + id, params);
};

export const delCategory = async (id) => {
  return await del("/admin/category/" + id);
};
