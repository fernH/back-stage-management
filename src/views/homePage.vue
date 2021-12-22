<template>
  <div class="boss">
    <header>
      <Form :model="formCustom" :label-width="70" inline>
        <FormItem label="作者名称">
          <Input v-model="formCustom.author"></Input>
        </FormItem>
        <FormItem label="上传时间">
          <DatePicker v-model="starttime" type="datetime"> </DatePicker>
          --
          <DatePicker
            v-model="endtime"
            type="datetime"
            format="yyyy-MM-dd HH:mm"
          ></DatePicker>
        </FormItem>
        <FormItem :label-width="10">
          <Input
            type="text"
            v-model="formCustom.cname"
            placeholder="请输入您要查询的类别"
            number
          ></Input>
        </FormItem>
        <FormItem class="butItem" :label-width="1">
          <Button type="primary" class="submitBut" @click="handleSearch()"
            >查询</Button
          >
          <Button type="primary" @click="(addEditDialog = true), (add = true)"
            >新增</Button
          >
          <!-- 新增编辑dialog -->
          <Modal v-model="addEditDialog" :title="add ? '新增内容' : '编辑内容'">
            <p>操作人员:{{ operator }}</p>
            <br />
            <Form
              ref="ruleValidate"
              :model="formValidate"
              :rules="ruleValidate"
              :label-width="80"
            >
              <FormItem label="作者名" prop="author">
                <Input v-model="formValidate.author"></Input>
              </FormItem>
              <FormItem label="类别" prop="cname">
                <Input v-model="formValidate.cname"></Input>
              </FormItem>
              <FormItem label="优先级" prop="displayorder">
                <Input v-model="formValidate.displayorder"></Input>
              </FormItem>

              <FormItem label="发布时间" prop="release">
                <Row>
                  <Col span="12">
                    <DatePicker
                      v-model="formValidate.release"
                      type="datetime"
                      style="width: 200px"
                      format="yyyy-MM-dd HH:mm:ss"
                    >
                    </DatePicker>
                  </Col>
                </Row>
              </FormItem>

              <FormItem label="上传" required>
                <Upload
                  action=""
                  :before-upload="uploadImg"
                  :format="['jpg', 'jpeg', 'png']"
                >
                  <Button icon="ios-cloud-upload-outline" type="success"
                    >上传图片</Button
                  >
                </Upload>
              </FormItem>

              <FormItem label="图片预览" prop="image">
                <template>
                  <img style="width: 20%" :src="formValidate.image" />
                  <Icon type="ios-eye-outline" @click.native="handleView()">
                  </Icon>
                </template>
              </FormItem>

              <!-- 大图dialge -->
              <Modal title="View Image" v-model="imagedialge">
                <img :src="viewImage" v-if="imagedialge" style="width: 100%" />
              </Modal>
              <!-- 大图dialge -->
            </Form>

            <div slot="footer">
              <Button type="error" @click="addEditDialog = false">取消</Button>
              <Button type="success" @click="addEadiBut('ruleValidate')"
                >确定</Button
              >
            </div>
          </Modal>
          <!-- 新增编辑dialog -->
          <Button type="warning" :disabled="disabled" @click="release"
            >发布</Button
          >
          <Button type="error" :disabled="disabled" @click="remove"
            >删除</Button
          >
        </FormItem>
      </Form>
    </header>
    <!-- 表格 -->
    <Content>
      <Table
        border
        :columns="columns12"
        :data="tableList"
        class="table"
        height="770"
        @on-selection-change="selectTableChange"
      >
        <template slot-scope="{ row }" slot="status">
          <strong>{{ row.status == 1 ? "已发布" : "未发布" }}</strong>
        </template>
        -->
        <template slot-scope="{ row, index }" slot="action">
          <Button type="warning" size="small" @click="Edit(row, index)"
            >编辑</Button
          >
        </template>
      </Table>
    </Content>

    <secondConfirmation
      v-if="delectDialog"
      :delectDialog="delectDialog"
      :delectList="delectList"
      @closeDialog="closeDialog"
      @succesMsg="succesMsg"
    >
    </secondConfirmation>

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
    <!-- 新增编辑dialog -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import secondConfirmation from "@/components/secondConfirmation.vue";

export default Vue.extend({
  name: "homePage",
  components: {
    secondConfirmation,
  },
  data() {
    type formValidateType = {
      author: string;
      cname: string;
      displayorder: string;
      release: number | string;
      image: string;
      psize: number | string;
      id: null | string;
    };
    return {
      formCustom: {
        author: "",
        starttime: "",
        endtime: "",
        cname: "",
        psize: 30,
        p: null,
      },
      addEditDialog: false, //新增编辑弹框
      columns12: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          type: "index",
          width: 60,
          align: "center",
        },
        {
          title: "状态",
          slot: "status",
        },
        {
          title: "类别",
          key: "cname",
        },
        {
          title: "作者名",
          key: "author",
        },
        {
          title: "优先级",
          key: "displayorder",
        },
        {
          title: "操作者",
          key: "editname",
        },
        {
          title: "上传时间",
          key: "created_at",
        },
        {
          title: "发布时间",
          key: "release_at",
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
        author: "",
        cname: "",
        displayorder: "",
        release: "",
        image: "",
        psize: 30,
        id: null,
      } as formValidateType,
      ruleValidate: {
        author: [
          {
            required: true,
            message: "请输入作者名",
            trigger: "blur",
          },
        ],
        cname: [
          {
            required: true,
            message: "请输入类别",
            trigger: "blur",
          },
        ],
        displayorder: [
          {
            required: true,
            message: "请输入优先级",
            trigger: "blur",
          },
        ],
        release: [
          {
            required: true,
            type: "date",
            message: "请输入发布时间",
            trigger: "change",
          },
        ],
        image: [
          {
            required: true,
            message: "请上传图片",
            trigger: "change",
          },
        ],
      },
      operator: "", //操作人员
      imagedialge: false,
      viewImage: "",
      add: false,
      photo: "",
      editDate: {},
      selectionData: [],
      starttime: "",
      endtime: "",
      editId: "",
      disabled: true,
      plist: false, //true为主动获取列表 false为查询后获取列表
      delectDialog: false, //删除确认二次弹框
      delectList: "", //删除id
    };
  },
  created() {
    this.getHomeList();
    this.operator = JSON.parse(
      sessionStorage.getItem("loginMsg") as any
    ).username;
  },
  methods: {
    /**
     * @description 新增编辑
     */
    addEadiBut(name: any) {
      (this.$refs[name] as any).validate((valid: Boolean) => {
        if (valid) {
          this.formValidate.release =
            new Date(this.formValidate.release).getTime() / 1000;
          //add为true则为新增 否则为false
          if (this.add) {
            this.$platApi.homadd(this.formValidate).then((res: any) => {
              const { status, msg } = res.data;
              if (status === 9000) {
                this.$Message.success(msg);
                this.getHomeList();
                this.addEditDialog = false;
              }
              if (status !== 9000) this.$Message.error(msg);
            });
          } else {
            this.formValidate.id = this.editId;
            this.$platApi.homeEdit(this.formValidate).then((res: any) => {
              const { status, msg } = res.data;
              if (status === 9000) {
                this.$Message.success(msg);
                this.getHomeList();
                this.addEditDialog = false;
              }
              if (status !== 9000) this.$Message.error(msg);
            });
          }
        } else {
          this.$Message.error("输入有误");
        }
      });
    },

    /**
     * @description 获取列表
     * @param obj 页数
     */
    getHomeList(
      obj = {
        psize: 30,
      }
    ) {
      this.plist = true;
      this.$platApi.homeList(obj).then((res: any) => {
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
     * @description 搜索查询
     */
    handleSearch() {
      this.plist = false;
      (this.formCustom.starttime as any) = this.starttime
        ? new Date(this.starttime).getTime() / 1000
        : "";
      (this.formCustom.endtime as any) = this.endtime
        ? new Date(this.endtime).getTime() / 1000
        : "";
      this.$platApi.homeSearch(this.formCustom).then((res: any) => {
        const { status, msg, data } = res.data;
        if (status === 9000) {
          this.$Message.success(msg);
          this.tableList = data.list;
          this.total = data.total;
        }
        if (status !== 9000) this.$Message.error(msg);
      });
    },

    /**
     * @description 发布
     */
    release() {
      if (this.selectionData.length != 0) {
        let relList = this.selectionData
          .map((item: any) => {
            return item.id;
          })
          .join();
        this.$platApi.homeRelease({ ids: relList }).then((res: any) => {
          const { status, msg } = res.data;
          if (status === 9000) {
            this.$Message.success(msg);
            this.getHomeList();
            this.selectionData.length = 0;
          }
          if (status !== 9000) this.$Message.error(msg);
        });
      }
    },

    /**
     * @description 删除
     */
    remove() {
      if (this.selectionData.length != 0) {
        this.delectDialog = true;
        this.delectList = this.selectionData
          .map((item: any) => {
            return item.id;
          })
          .join();
      }
    },

    // 删除 二次确认弹框,取消
    closeDialog(msg: Boolean) {
       if(!msg) this.delectDialog = false;
    },

     // 删除 二次确认弹框 确定删除后弹框状态
    succesMsg(msg: Boolean) {
      if(msg){
        this.delectDialog = false;
        this.getHomeList();
        this.selectionData.length = 0;
      }
    },

    /**
     * @description 编辑
     */
    Edit(row: any) {
      this.add = false;
      this.addEditDialog = true;
      this.formValidate = {
        author: row.author,
        cname: row.cname,
        displayorder: String(row.displayorder),
        release: row.release_at,
        image: row.image,
      } as any;
      this.viewImage = row.image;
      this.editId = row.id;
    },

    /**
     * @description  在多选模式下有效，只要选中项发生变化时就会触发
     */
    selectTableChange(selection: any) {
      this.selectionData = selection;
      this.disabled = selection.length ? false : true;
    },

    /**
     * @description 分页
     */
    pageChange(page: any) {
      if (this.plist) {
        let obj = {
          p: page,
          psize: 30,
        };
        this.getHomeList(obj);
      }
      if (!this.plist) {
        this.formCustom.p = page;
        this.handleSearch();
      }
    },

    /**
     * @description 上传图片
     * @param  file 图片文件
     */
    uploadImg(file: any) {
      let imgFormDate = new FormData();
      imgFormDate.append("photo", file);
      this.$platApi.upimg(imgFormDate).then((res: any) => {
        const { status, msg, data } = res.data;
        if (status === 9000) {
          this.$Message.success("上传成功");
          this.formValidate.image = data.path;
        }
        if (status !== 9000) this.$Message.error(msg);
      });
    },

    /**
     * @description 新增图片预览
     */
    handleView() {
      this.imagedialge = true;
      this.viewImage = this.formValidate.image;
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

    .butItem {
      button {
        margin-left: 20px;
      }
      .submitBut {
        margin-right: 100px;
      }
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
</style>
