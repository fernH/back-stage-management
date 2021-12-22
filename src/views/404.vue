<template>
  <div class="appboss">
    <div class="head404"></div>
    <div class="txtbg404">
      <div class="txtbox">
        <p>页面不存在或者您无权限访问，请联系管理员进行权限配置</p>
        <p class="paddingbox">请点击以下链接继续浏览网页</p>
        <p>》<a style="cursor: pointer" @click="back">返回上一页面</a></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  methods: {
    /**
     * @description 返回上一个页面
     */
    back() {
      this.$router.go(-1);
    },
  },
});
</script>

<style lang="less" scoped>
.appboss {
  background: #494949;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.head404 {
  width: 580px;
  height: 234px;
  margin: 50px auto 0 auto;
  background: url(../assets/head404.png) no-repeat;
}

.txtbg404 {
  width: 499px;
  height: 169px;
  margin: 10px auto 0 auto;
  background: url(../assets/txtbg404.png) no-repeat;
}

.txtbg404 .txtbox {
  width: 390px;
  position: relative;
  top: 30px;
  left: 60px;
  color: #eee;
  font-size: 15px;
}

.txtbg404 .txtbox p {
  margin: 5px 0;
  line-height: 18px;
}

.txtbg404 .txtbox .paddingbox {
  padding-top: 15px;
}

.txtbg404 .txtbox p a {
  color: #eee;
  text-decoration: none;
}

.txtbg404 .txtbox p a:hover {
  color: #fc9d1d;
  text-decoration: underline;
}
</style>
