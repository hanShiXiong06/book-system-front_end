import { get } from "@/utils/request";

export const fetchBook = async () => {
  return await get("/admin/category");
};
