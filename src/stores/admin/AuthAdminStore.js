import { defineStore } from "pinia";
import { ref } from "vue";
// import { useStorage } from "@vueuse/core";

export const useAuthAdminStore = defineStore(
  "AuthAdminStore",
  () => {
    const userinfo = ref({
      token: "",
    });

    const saveToken = (token) => {
      userinfo.value.token = token;
    };

    const isAuthenticated = () => {
      return Boolean(userinfo.value.token);
    };

    return {
      userinfo,
      saveToken,
      isAuthenticated,
    };
  },
  {
    //
    persist: true,
  }
);
