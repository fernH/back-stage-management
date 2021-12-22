import axios from "axios";
import router from "../router";

// 创建axios实例
const commonRequest = axios.create({
  timeout: 3000,
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    // post: {
    //   "content-type": "application/x-www-form-urlencoded",
    // } as any,
  },
});

const platRequest = axios.create({
  timeout: 7000,
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    // post: {
    //   // "content-type": "application/json",
    // } as any,
  },
});

// 请求拦截 给heardr添加token id
platRequest.interceptors.request.use(
  (config: any) => {
    const loginMsg = JSON.parse(sessionStorage.getItem("loginMsg") as any);
    // 在header上面添加token id
    if (loginMsg) {
      config.headers!["user-token"] = loginMsg.token;
      config.headers!.id = loginMsg.id;
    }
    return config;
  },
  (err: any) => {
    return Promise.reject(err);
  }
);

//  返回拦截  如果返回状态码为9002 则返回登录页
platRequest.interceptors.response.use(
  (response: any) => {
    const res = response.data;
    if (res.status === 9002) {
      router.replace({
        path: "/login",
        // query: { redirect: router.currentRoute.fullPath },
      });
    }
    return response

  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export { commonRequest, platRequest };
