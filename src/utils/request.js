// 模块化开发优势
import axios from "axios";

import { useAuthAdminStore } from "@/stores/admin/AuthAdminStore";

// 生成一个实例
const instance = axios.create({
  // baseURL: "http://localhost:3000",
  timeout: 30000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    config.headers.Authorization = `Bearer ${
      useAuthAdminStore().userinfo.token
    }`;
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    if (error.response && error.response.status === 401) {
      // 处理未授权错误，例如跳转到登录页
      console.log("Unauthorized - redirect to login page");
    }
    // message.error("请求失败，请稍后重试！");
    return Promise.reject(error);
  }
);

// GET请求封装
export const get = (url, params = {}) => {
  return instance.get(url, { params });
};

export const post = (url, data = {}, needAuth = true) => {
  // 检查data中是否包含文件类型（通常为File对象）
  let isFormData = false;
  for (let key in data) {
    if (data.hasOwnProperty(key) && data[key] instanceof File) {
      isFormData = true;
      break;
    }
  }

  const config = {
    headers: {},
  };

  if (isFormData) {
    // 如果data包含文件，则使用multipart/form-data
    config.headers["Content-Type"] = "multipart/form-data";
  } else if (needAuth) {
    // 如果不包含文件，且需要认证，则添加Authorization header
    config.headers["Authorization"] = `Bearer ${
      useAuthAdminStore().userinfo.token
    }`;
    config.headers["Content-Type"] = "application/json";
  } else {
    // 如果不需要认证，则只设置Content-Type为application/json
    config.headers["Content-Type"] = "application/json";
  }

  return instance.post(url, data, config);
};
// PUT请求封装，支持提交图片
export const put = (url, data = {}) => {
  return instance.put(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// DELETE请求封装
export const del = (url) => {
  return instance.delete(url);
};
