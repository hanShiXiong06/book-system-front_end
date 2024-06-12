import { get } from "@/utils/request";

export const fetchCategory = async () => {
  return await get("/admin/category");
};
