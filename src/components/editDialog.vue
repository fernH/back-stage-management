<template>
  <div class="editdialog">
    <!-- 新增编辑dialog -->
    <Modal v-model="editDialog" title="编辑账号" :closable="false" :mask-closable="false">
      <Form
        ref="ruleValidate"
        :model="row"
        :rules="ruleValidate"
        :label-width="80"
        class="addfrom"
      >
        <FormItem label="姓名" prop="nickname">
          <Input v-model="row.nickname"></Input>
        </FormItem>
        <FormItem label="账号" prop="username">
          <Input v-model="row.username"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input type="password" v-model="row.password" placeholder="请输入6-20位的数字或字母的密码"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="password1">
          <Input type="password" v-model="row.password1"></Input>
        </FormItem>
        <FormItem label="权限" prop="authId">
          <Select v-model="row.authId">
            <Option v-for="item in roleLists" :value="item.id" :key="item.id">{{
              item.name
            }}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="error" @click="editDialogClose()">取消</Button>
        <Button type="success" @click="EadiBut('ruleValidate')">确定</Button>
      </div>
    </Modal>
    <!-- 新增编辑dialog -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { validatePass } from "../libs/reg";

export default Vue.extend({
  name: "Home",
  props: {
    editDialog: {   //控制弹窗显隐
      type: Boolean,
      default: false,
    },
    editDialogRow: Object,   //编辑行的数据
    roleLists: [],          // 所有角色的数据
  },
  data() {
    return {
      closeDialog: true,     //子组件给父组件传值 以此更改弹窗状态
      row: {
        touid: "",
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
            // validator: validatePass,
            required: false,
            message: "请输入6-20位的数字或字母的密码",
            trigger: "blur",
          },
        ],
        password1: [
          {
            required: false,
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
    };
  },
  created() {
    if (this.editDialogRow) {
      this.row.touid = this.editDialogRow.id;
      this.row.nickname = this.editDialogRow.nickname;
      this.row.username = this.editDialogRow.username;
      this.getRole();
    }
  },
  methods: {
    /**
     * @description 编辑
     */
    EadiBut(name: any) {
      (this.$refs[name] as any).validate((valid: Boolean) => {
        if (valid) {
          this.$platApi
            .authorityListEdit(this.row)
            .then((res: any) => {
              const { status, msg } = res.data;
              if (status === 9000) {
                this.$Message.success(msg);
                this.editDialogClose();
                this.$emit("status",true)  //子组件给父组件传值  status为true说明编辑成功
              }
              if (status !== 9000) this.$Message.error(msg);
            });
        } else {
          this.$Message.error("输入有误");
        }
      });
    },

    /**
     * @description 编辑id
     */
    getRole() {
      this.row.authId = (this.roleLists as Array<any>).find(
        (item: any) => item.name === this.editDialogRow.authname
      ).id;
    },

    /**
     *  @description 点击取消
     */
    editDialogClose() {
      this.closeDialog = false;
      this.$emit("closeDialog", this.closeDialog);
    },
  },
});
</script>

<style lang="less" scoped>
.addfrom {
  > div {
    width: 60% !important;
    margin: 20px auto;
  }
}
</style>
