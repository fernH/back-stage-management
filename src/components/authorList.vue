<template>
  <div class="authList">
    <Modal
      width="750"
      v-model="authorityListDialog"
      :closable="false"
      :mask-closable="false"
      title="权限列表"
    >
      <Table border :columns="columns" :data="tableList">
        <template slot-scope="{ row }" slot="action">
          <!-- <Button type="primary" size="small" style="margin-right: 5px"
            >编辑</Button
          > -->
          <Button type="error" size="small" @click="authDel(row.id)"
            >删除</Button
          >
        </template>
      </Table>
      <!-- 分页 -->
      <template>
        <Page
          :total="total"
          show-total
          show-elevator
          show-sizer
          :page-size="30"
          :page-size-opts="[30]"
          @on-change="pageChange"
          height="400"
          size="small"
        />
      </template>

      <div slot="footer">
        <Button type="primary" @click="listcloseDialog">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    authorityListDialog: Boolean,
  },
  data() {
    return {
      closeDialog: true,
      columns: [
        {
          title: "名称",
          key: "name",
        },
        {
          title: "操作人",
          key: "editname",
        },
        {
          title: "生成时间",
          key: "created_at",
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
        },
      ],
      tableList: [],
      total: 0,
      value: "",
    };
  },
  created() {
    this.authorTableList();
  },
  methods: {
    /**
     * @description 权限列表
     */
    authorTableList(obj = { psize: 30 }) {
      this.$platApi.AuthorTableList(obj).then((res: any) => {
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
     * @description 分页
     */
    pageChange(pageNo: any) {
      const obj = { p: pageNo, psize: 30 };
      this.authorTableList(obj);
    },

    /**
     * @description 删除权限列表
     */
    authDel(id: any) {
      this.$Modal.confirm({
        content: "<p>确定删除？</p>",
        cancelText: "取消",
        onOk: () => {
          this.$platApi.AuthorTableListDel({ touid: id }).then((res: any) => {
            const { status, msg } = res.data;
            if (status === 9000) {
              this.$Message.success(msg);
              this.authorTableList();
            }
            if (status !== 9000) this.$Message.success(msg);
          });
        },
      });
    },
    /**
     * @description 取消
     */
    listcloseDialog() {
      this.closeDialog = false;
      this.$emit("closeDialog", this.closeDialog);
    },
  },
});
</script>
>

<style lang="less" scoped></style>
