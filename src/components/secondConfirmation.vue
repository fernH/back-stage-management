<template>
  <div>
    <Modal
      v-model="delectDialog"
      width="360"
      :closable="false"
      :mask-closable="false"
    >
      <p style="text-align: center">确定删除？</p>
      <div slot="footer">
        <Button type="primary" @click="secondClose">取消</Button>
        <Button type="error" @click="suredel">确定删除</Button>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  props: {
    delectDialog: {
      //控制弹窗显隐
      type: Boolean,
      default: false,
    },
    delectId: Number, //删除行的id  权限列表
    delectList: String, //删除id    主页
  },
  data() {
    return {
      closeDialog: true,
    };
  },
  methods: {
    /**
     * @description 确定删除
     */
    suredel() {
      //权限列表删除
      if (this.delectId) {
        this.$platApi
          .authorityListDel({ touid: this.delectId })
          .then((res: any) => {
            const { status, msg } = res.data;
            if (status === 9000) {
              this.$Message.success(msg);
              this.secondClose();
              this.$emit("status", true);
            }
            if (status !== 9000) this.$Message.error(msg);
          });
      }

      //主页删除
      if (this.delectList) {
        this.$platApi.homeDelete({ ids: this.delectList }).then((res: any) => {
          const { status, msg } = res.data;
          if (status === 9000) {
            this.$Message.success(msg);
            this.secondClose();
            this.$emit("succesMsg", true);
          }
          if (status !== 9000) this.$Message.success(msg);
        });
      }
    },

    /**
     *  @description 点击取消
     */
    secondClose() {
      this.closeDialog = false;
      this.$emit("closeDialog", this.closeDialog);
    },
  },

});
</script>

<style lang="less" scoped></style>
