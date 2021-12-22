<template>
  <div class="layout">
    <Layout>
      <Sider hide-trigger>
        <h5 class="header">同人站运营后台</h5>
        <Menu width="auto" active-name="主页">
          <MenuItem
            :name="item.title"
            v-for="item in menuList"
            :key="item.id"
            :to="item.visit"
          >
            {{ item.title }}
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Header>
          <div>
            <i>{{ account }}</i>
            <Button type="primary" @click="lagout">退出</Button>
          </div>
        </Header>
        <Content>
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "layout",
  data() {
    return {
      account: "account",
      menuList: [],
    };
  },
  created() {
    this.account = JSON.parse(
      sessionStorage.getItem("loginMsg") as any
    ).username;
    this.menuList=[]
  },
  methods: {
    /**
     * @description 退出登录
     */
    lagout() {
      this.$platApi.logoutAccount({}).then((res: any) => {
        const { status, msg } = res.data;
        if (status === 9000) {
          this.$Message.success(msg);
          this.$router.push("/login");
          // sessionStorage.clear()
        }
        if (status != 9000) this.$Message.error(msg);
      });
    },
  },
  mounted() {
    this.menuList = JSON.parse(sessionStorage.getItem("menuList") as any);
  },
});
</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;
  //   background: steelblue;
  .ivu-layout {
    width: 100%;
    height: 100%;
  }

  .ivu-layout.ivu-layout-has-sider > .ivu-layout,
  .ivu-layout.ivu-layout-has-sider > .ivu-layout-content {
    // overflow: hidden;
  }

  .ivu-layout-sider {
    background: rgb(1, 17, 87);
    h5 {
      width: 100%;
      height: 64px;
      background: rgb(1, 17, 87);
      text-align: center;
      line-height: 64px;
      color: rgb(249, 250, 249);
      font-size: 20px;
      font-weight: bold;
    }

    .ivu-menu-light.ivu-menu-vertical
      .ivu-menu-item-active:not(.ivu-menu-submenu):after {
      width: 0;
    }

    .ivu-menu-vertical.ivu-menu-light:after {
      width: 0;
    }

    .ivu-menu-light {
      background: rgb(1, 17, 87);
    }

    .ivu-menu-item {
      color: white;
    }

    .ivu-menu-light.ivu-menu-vertical
      .ivu-menu-item-active:not(.ivu-menu-submenu) {
      background: rgb(116, 221, 121);
      color: white;
    }

    .ivu-menu-vertical .ivu-menu-item:hover,
    .ivu-menu-vertical .ivu-menu-submenu-title:hover {
      color: white;
    }
  }

  .ivu-layout-header {
    // width: calc(100% - 200px);
    // position: fixed;
    // right: 0;
    // top: 0;
    background: rgb(10, 0, 0);
    z-index: 99;
    display: flex;
    justify-content: flex-end;
    div {
      color: white;
      i {
        margin-right: 10px;
        font-weight: bold;
      }
    }
  }

  .ivu-layout-content {
    // background: rgb(17, 252, 193);
  }
}
</style>
