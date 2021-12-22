<template>
  <div class="boss">
    <header>
      <Button type="primary" @click="addDialog = true">新增</Button>
      <!-- 新增编辑dialog -->
      <Modal v-model="addDialog" title="添加账号">
        <Form
          ref="ruleValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="80"
          class="addfrom"
        >
          <FormItem label="姓名" prop="nickname">
            <Input v-model="formValidate.nickname"></Input>
          </FormItem>
          <FormItem label="账号" prop="username">
            <Input v-model="formValidate.username"></Input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input
              type="password"
              v-model="formValidate.password"
              placeholder="6--20个字符"
            ></Input>
          </FormItem>
          <FormItem label="确认密码" prop="password1">
            <Input type="password" v-model="formValidate.password1"></Input>
          </FormItem>
          <FormItem label="权限" prop="authId">
            <Select v-model="formValidate.authId">
              <Option
                v-for="item in roleLists"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
        </Form>

        <div slot="footer">
          <Button type="error" @click="addDialog = false">取消</Button>
          <Button type="success" @click="addBut('ruleValidate')">确定</Button>
        </div>
      </Modal>
      <!-- 新增编辑dialog -->
      <!-- <Button type="warning" @click="addAuthor">新增权限</Button> -->
      <Button type="error" @click="authorityListDialog = true">权限列表</Button>
    </header>
    <!-- 表格 -->
    <Content>
      <Table border :columns="columns12" :data="tableList" height="770">
        <template slot-scope="{ row }" slot="action">
          <Button type="warning" style="margin-right: 5px" @click="Edit(row)"
            >编辑</Button
          >
          <Button
            type="error"
            @click="(delectDialog = true), (delectId = row.id)"
            >删除</Button
          >
        </template>
      </Table>
    </Content>

    <!-- 二次确定删除组件 -->
    <secondConfirmation
      v-if="delectDialog"
      :delectDialog="delectDialog"
      :delectId="delectId"
      @closeDialog="closeDialog"
      @status="status"
    ></secondConfirmation>
    <!-- 二次确定删除组件结束 -->

    <!-- 权限列表 -->
    <authorList
      :authorityListDialog="authorityListDialog"
      @closeDialog="closeDialog"
      
    >
    </authorList>

    <!-- 编辑组件 -->
    <editdialogVue
      v-if="editDialog"
      :editDialog="editDialog"
      :editDialogRow="editDialogRow"
      :roleLists="roleLists"
      @closeDialog="closeDialog"
      @status="status"
    ></editdialogVue>

    <!-- 分页 -->
    <footer>
      <Page
        :total="total"
        show-total
        show-elevator
        show-sizer
        :page-size="30"
        :page-size-opts="[30]"
        @on-change="pageChange"
      />
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { validatePass } from "../libs/reg";
import editdialogVue from "@/components/editDialog.vue";
import secondConfirmation from "@/components/secondConfirmation.vue";
import authorList from "@/components/authorList.vue";

export default Vue.extend({
  name: "homePage",
  components: {
    editdialogVue,
    secondConfirmation,
    authorList,
  },
  data() {
    return {
      addDialog: false, //新增编辑弹框
      columns12: [
        {
          type: "index",
          width: 60,
          align: "center",
        },
        {
          title: "姓名",
          key: "nickname",
        },
        {
          title: "账号",
          key: "username",
        },
        {
          title: "创建时间",
          key: "created_at",
        },
        {
          title: "权限",
          key: "authname",
        },
        {
          title: "操作人",
          key: "pidname",
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
        },
      ],
      tableList: [],
      total: 0,
      formValidate: {
        nickname: "",
        username: "",
        password: "",
        password1: "",
        authId: "",
      },
      ruleValidate: {
        nickname: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
        username: [
          {
            required: true,
            message: "请输账号",
            trigger: "blur",
          },
        ],
        password: [
          {
            validator: validatePass,
            required: true,
            message: "请输入6-20位的数字或字母的密码",
            trigger: "blur",
          },
        ],
        password1: [
          {
            required: true,
            message: "请输入确认密码",
            trigger: "blur",
          },
        ],
        authId: [
          {
            required: true,
            message: "请选择权限",
            type: "number",
            trigger: "change",
          },
        ],
      },
      authorityListDialog: false, //权限dialog
      roleLists: [], //角色
      editDialog: false, //编辑组件
      editDialogRow: {},
      delectDialog: false,
      delectId: "",
    };
  },
  created() {
    this.getAuthorityList();
    this.getAuthorityRole();
  },
  methods: {
    /**
     * @description 新增
     */
    addBut(name: any) {
      (this.$refs[name] as any).validate((valid: Boolean) => {
        if (valid) {
          this.$platApi
            .authorityAddAccount(this.formValidate)
            .then((res: any) => {
              const { status, msg } = res.data;
              if (status === 9000) {
                this.$Message.success(msg);
                this.getAuthorityList();
                this.addDialog = false;
              }
              if (status !== 9000) this.$Message.error(msg);
            });
        } else {
          this.$Message.error("输入有误");
        }
      });
    },

    /**
     * @description 获取列表
     * @param obj 页数
     */
    getAuthorityList(
      obj = {
        psize: 30,
      }
    ) {
      this.$platApi.authorityList(obj).then((res: any) => {
        const { status, msg, data } = res.data;
        if (status === 9000) {
          this.$Message.success(msg);
          this.tableList = data.list;
          this.total = data.total;
        }
        if (status !== 9000) this.$Message.success(msg);
      });
    },

    /**
     * @description 获取角色
     */
    getAuthorityRole() {
      this.$platApi.authorityRole({}).then((res: any) => {
        const { status, msg, data } = res.data;
        if (status === 9000) {
          this.$Message.success(msg);
          this.roleLists = data;
        }
        if (status !== 9000) this.$Message.success(msg);
      });
    },

    // /**
    //  * @description 新增权限
    //  */
    // addAuthor() {
    //   // this.$platApi.addAuthor({ ids: 1 }).then((res: any) => {
    //   //   const { status, msg } = res.data;
    //   //   if (status === 9000) {
    //   //     this.$Message.success(msg);
    //   //     this.getAuthorityList();
    //   //   }
    //   //   if (status !== 9000) this.$Message.error(msg);
    //   // });
    // },

    /**
     * @description 编辑
     */
    Edit(row: any) {
      this.editDialog = true;
      this.editDialogRow = row;
    },

    /**
     * @description 子组件传值点击取消dialog框的状态
     */
    closeDialog(msg: Boolean) {
      if (!msg) {
        this.editDialog = false;
        this.delectDialog = false;
        this.authorityListDialog = false;
      }
    },

    /**
     * @description 子组件传值修改成功重新获取列表
     */
    status(msg: Boolean) {
      if (msg) this.getAuthorityList();
      
    },

    /**
     * @description 分页
     */
    pageChange(page: any) {
      let obj = {
        p: page,
        psize: 30,
      };
      this.getAuthorityList(obj);
    },
  },
});
</script>

<style lang="less" scoped>
.boss {
  width: 100%;
  height: 100%;
  header {
    width: 100%;
    height: 40px;
    padding: 10px 0 40px 0;
    box-sizing: border-box;
    border-bottom: 2px solid black;
    display: flex;
    justify-content: flex-start;
    .ivu-form-item:first-child {
      margin-left: 30px;
    }
    button {
      margin-left: 20px;
    }
  }

  .ivu-layout-content {
    width: 98%;
    height: 87%;
    margin: 0 auto;
    margin-top: 1%;
  }

  /deep/ .iconcover {
    background: springgreen;
  }

  footer {
    width: 100%;
    overflow: hidden;
    margin-top: 10px;
  }
}

.addfrom {
  > div {
    width: 60% !important;
    margin: 20px auto;
  }
}
</style>
