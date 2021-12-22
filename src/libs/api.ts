import { commonRequest, platRequest } from "./axios";
import Vue from "vue";
import axios from "axios";
import qs from "qs";

const url =
  process.env.NODE_ENV === "development"
    ? "http://trdec.moefantasy.com"
    : "http://trdec.moefantasy.com";

const commonApi = {
  // 登录
  login(data: any) {
    return commonRequest.post(url+"/admin/dologin", qs.stringify(data));
  },
};

const platApi = {
  // 主页新增图片上传
  upimg(data: any) {
    const upimgConfig = {
      hearders: {
        "content-type": "multipart/form-data",
      },
    };
    return platRequest.post(url+"/admin/uploads", data, upimgConfig as any);
  },

  //  主页新增
  homadd(data: any) {
    return platRequest.post(url+"/admin/index/add", qs.stringify(data));
  },

  //  获取主页列表
  homeList(data: any) {
    return platRequest.post(url+"/admin/index/list", qs.stringify(data));
  },

  //主页列表查询
  homeSearch(data: any) {
    return platRequest.post(url+"/admin/index/sel", qs.stringify(data));
  },

  //主页删除
  homeDelete(data: any) {
    return platRequest.post(url+"/admin/index/del", qs.stringify(data));
  },

  //主页发布
  homeRelease(data: any) {
    return platRequest.post(url+"/admin/index/rel", qs.stringify(data));
  },

  //主页修改
  homeEdit(data: any) {
    return platRequest.post(url+"/admin/index/edit", qs.stringify(data));
  },

  //权限页面列表
  authorityList(data: any) {
    return platRequest.post(url+"/admin/member/list", qs.stringify(data));
  },

  // 权限页面 新增-权限
  authorityRole(data: any) {
    return platRequest.post(url+"/admin/auth/cho", qs.stringify(data));
  },

  // 权限页面 新增账号
  authorityAddAccount(data: any) {
    return platRequest.post(url+"/admin/member/add", qs.stringify(data));
  },

  // 权限页面 删除
  authorityListDel(data: any) {
    return platRequest.post(url+"/admin/member/del", qs.stringify(data));
  },

  // 权限页面 编辑
  authorityListEdit(data: any) {
    return platRequest.post(url+"/admin/member/edit", qs.stringify(data));
  },

  // 权限页面 新增权限
  addAuthor(data: any) {
    return platRequest.post(url+"/admin/auth/add", qs.stringify(data));
  },

  // 权限页面 权限列表
  AuthorTableList(data: any) {
    return platRequest.post(url+"/admin/auth/list", qs.stringify(data));
  },

  // 权限页面 权限列表--删除
  AuthorTableListDel(data: any) {
    return platRequest.post(url+"/admin/auth/del", qs.stringify(data));
  },

  // 登录后用户权限
  Authority(data:any){
    return platRequest.post(url+"/admin/getmenu",qs.stringify(data))
  },

   // 登录后用户权限
   logoutAccount(data:any){
    return platRequest.post(url+"/admin/logout",qs.stringify(data))
  },

};

//this.$commonApi.login 登录请求
Vue.prototype.$commonApi = commonApi;
Vue.prototype.$platApi = platApi;
Vue.prototype.$platRequest = platRequest;