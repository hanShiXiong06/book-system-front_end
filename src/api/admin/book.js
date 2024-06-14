import { get, post, put, del } from "@/utils/request";

// 分类api
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
// 图书api

export const fetchBookList = async (params) =>
  await get("/admin/books", params);
