<template>
  <div class="boss">
    <h4>同人站后台登录</h4>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
      <FormItem prop="username">
        <Input v-model="formValidate.username"></Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formValidate.password"></Input>
      </FormItem>
      <FormItem class="butitem" :label-width="0">
        <Button type="primary" @click="handleSubmit('formValidate')"
          >登录</Button
        >
      </FormItem>
    </Form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "login",
  data() {
    return {
      formValidate: {
        username: "",
        password: "",
      },
      ruleValidate: {
        username: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
      loginMsg: [], //登录用户数据
      menuList: [], //Menu导航
    };
  },
  created() {},
  methods: {
    /**
     * @description 登录
     * @param name 登录检测是否已填
     */
    handleSubmit(name: string) {
      (this.$refs[name] as any).validate((valid: Boolean) => {
        if (valid) {
          this.$commonApi.login(this.formValidate).then((res: any) => {
            const { status, msg, data } = res.data;
            if (status === 9000) {
              this.$Message.success(msg);
              this.getAuthority();
              sessionStorage.setItem("loginMsg", JSON.stringify(data));
            }
           
            if (status != 9000) this.$Message.error(msg);
          });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },

    /**
     * @description 获取权限
     */
    getAuthority() {
      this.$platApi.Authority({}).then((res: any) => {
        const { data } = res.data;
        console.log("获取权限",data)

        let menuList = data.filter((item: any) => item.stated === 1);
        sessionStorage.setItem("menuList", JSON.stringify(menuList));
        let routerList = [];
        routerList = data
          .filter((item: any) => item.stated === 1)
          .map((item2: any) => {
            return item2.visit;
          });
        //路由
        routerList.push("/layout", "/404");
        sessionStorage.setItem("routerList", JSON.stringify(routerList));
        this.$router.push("/layout");
      });
    },
  },
});
</script>

<style lang="less" scoped>
.boss {
  width: 250px;
  color: rgb(28, 168, 168);
  //   background: rgb(116, 61, 61);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  h4 {
    font-size: 20px;
    margin-bottom: 20px;
    text-align: center;
    font-weight: bold;
  }

  .butitem {
    .ivu-btn-primary {
      width: 100%;
      float: left;
    }
  }
}
</style>
