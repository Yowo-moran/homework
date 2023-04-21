<template>
  <div class="allManagement">
    <el-container>
      <el-header height="60px">
        <el-page-header
          @back="exit"
          content="学生管理"
          class="headTitle"
        ></el-page-header>
      </el-header>
      <el-main>
        <div class="searchFrame">
          <el-input
            placeholder="请输入搜索关键字"
            v-model="search"
            @keyup.enter.native="getSearch"
            clearable
          >
          </el-input>
          <div class="searchButton">
            <el-button
              icon="el-icon-search"
              circle
              @click="getSearch"
            ></el-button>
          </div>
          <div class="addMessage">
            <el-button type="success" @click="addUp">添加信息</el-button>
          </div>
        </div>

        <div class="main">
          <el-table :data="tableData" height="80vh" border style="width: 100%">
            <el-table-column
              prop="studentId"
              label="学号"
              fixed="left"
              width="150"
            >
            </el-table-column>
            <el-table-column prop="name" label="姓名" fixed="left" width="150">
            </el-table-column>
            <el-table-column prop="qq" label="QQ号" width="150">
            </el-table-column>
            <el-table-column prop="phoneNum" label="手机号" width="150">
            </el-table-column>
            <el-table-column prop="major" label="专业" width="150">
            </el-table-column>
            <el-table-column prop="className" label="班级" width="150">
            </el-table-column>
            <el-table-column
              prop="organizationName1"
              label="第一志愿"
              width="150"
            >
            </el-table-column>
            <el-table-column prop="branch1" label="部门" width="150">
            </el-table-column>
            <el-table-column prop="reason1" label="理由" width="150">
            </el-table-column>
            <el-table-column
              prop="organizationName2"
              label="第二志愿"
              width="150"
            >
            </el-table-column>
            <el-table-column prop="branch2" label="部门" width="150">
            </el-table-column>
            <el-table-column prop="reason2" label="理由" width="150">
            </el-table-column>
            <el-table-column prop="isDispensing" label="是否调剂" width="150">
              <template slot-scope="scope">
                {{ scope.row.isDispensing === 1 ? "是" : "否" }}
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click.native.prevent="
                    popUp(scope.$index, tableData, scope.row.studentId)
                  "
                  >编辑</el-button
                >
                <el-button
                  @click.native.prevent="
                    deleteRow(scope.$index, tableData, scope.row.studentId)
                  "
                  type="danger"
                  size="mini"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div style="height: 15px"></div>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[10, 15, 20, 25, 30]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="100"
            >
            </el-pagination>
          </div>
        </div>
        <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
          <div class="changeForm">
            <el-form
              ref="form"
              :model="form"
              :rules="rules"
              label-width="80px"
              label-position="left"
            >
              <el-form-item label="学号" prop="studentId">
                <el-input
                  v-model.number="form.studentId"
                  placeholder="请输入学号"
                  :maxlength="8"
                  :disabled="this.idLock"
                ></el-input>
              </el-form-item>

              <el-form-item label="姓名" prop="name">
                <el-input
                  v-model="form.name"
                  placeholder="请输入姓名"
                ></el-input>
              </el-form-item>
              <el-form-item label="qq号" prop="qq">
                <el-input
                  v-model.number="form.qq"
                  placeholder="请输入qq号"
                  :maxlength="10"
                ></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="phoneNum">
                <el-input
                  v-model.number="form.phoneNum"
                  placeholder="请输入手机号"
                  :maxlength="11"
                ></el-input>
              </el-form-item>

              <h4 class="title">专业与班级</h4>
              <div class="className">
                <el-form-item label="专业" prop="major" class="left">
                  <el-select v-model="form.major" placeholder="请选择专业">
                    <el-option
                      v-for="(m, index) in majorData"
                      :label="m.label"
                      :value="m.value"
                      :key="index"
                      @click.native="getMajorIndex(index)"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="班级" prop="className">
                  <el-select v-model="form.className" placeholder="请选择班级">
                    <el-option
                      v-for="(c, index) in majorData[majorIndex].children"
                      :label="c.label"
                      :value="c.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>

              <h4 class="title">填报志愿</h4>

              <div class="selectWant">
                <el-form-item
                  label="第一志愿"
                  prop="organizationName1"
                  class="left"
                >
                  <el-select
                    v-model="form.organizationName1"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(c, index) in organizationData"
                      :label="c.label"
                      :value="c.value"
                      :key="index"
                      @click.native="getWantIndex(index)"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="下属部门" prop="branch1">
                  <el-select v-model="form.branch1" placeholder="请选择">
                    <el-option
                      v-for="(c, index) in organizationData[wantIndex].children"
                      :label="c.label"
                      :value="c.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <el-form-item label="原因" prop="reason1">
                <el-input type="textarea" v-model="form.reason1"></el-input>
              </el-form-item>
              <div class="selectWant">
                <el-form-item label="第二志愿" class="left">
                  <el-select
                    v-model="form.organizationName2"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(c, index) in organizationData"
                      :label="c.label"
                      :value="c.value"
                      :key="index"
                      @click.native="getWantIndex2(index)"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="下属部门">
                  <el-select v-model="form.branch2" placeholder="请选择">
                    <el-option
                      v-for="(c, index) in organizationData[wantIndex2]
                        .children"
                      :label="c.label"
                      :value="c.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <el-form-item label="原因">
                <el-input type="textarea" v-model="form.reason2"></el-input>
              </el-form-item>
              <div class="adjust">
                <el-form-item label="是否调剂">
                  <el-switch v-model="form.isDispensing"></el-switch>
                </el-form-item>
              </div>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import request from "../api/index";
export default {
  name: "management",
  beforeRouteEnter(to, from, next) {
    let token = localStorage.getItem("token");
    if (token === null || token === "") {
      next("/login");
    } else {
      next();
    }
  },
  beforeMount() {
    request({
      method: "get",
      url: "/get/allForm",
      params: {
        page: 1, //第几页
        numPerPage: 10, //每页多少条数据
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((getForm) => {
      // console.log(getForm);
      this.tableData = getForm.data.data;
    });
  },
  data() {
    return {
      idLock: true,
      majorIndex: 0,
      wantIndex: 0,
      wantIndex2: 0,
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      search: "",
      currenPageNum: 1,
      everyPageNum: 10,
      pageAll: 1,
      tableData: [],
      form: {
        studentId: "",
        qq: "",
        name: "",
        phoneNum: "",
        major: "",
        className: "",
        // 必填
        organizationName1: "", // 组织名 必填
        branch1: "", // 组织下属部门 必填
        reason1: "", // 原因 必填
        // 选填
        organizationName2: "", // 组织名 选填
        branch2: "", // 组织下属部门 选填
        reason2: "", // 原因 选填
        isDispensing: false,
      },
      majorData: [
        {
          label: "--请选择--",
          children: [
            {
              label: "--请选择--",
            },
          ],
        },
        {
          value: "计算机科学与技术", // value是真正存储在后端的值，也是前端需要传给后端的参数，一般来说是数字
          label: "计算机科学与技术", // label是value值对应的标签，用于对应数据和信息
          children: [
            {
              value: "一班",
              label: "一班",
            },
            {
              value: "二班",
              label: "二班",
            },
            {
              value: "三班",
              label: "三班",
            },
            {
              value: "四班",
              label: "四班",
            },
          ],
        },
        {
          value: "信息安全",
          label: "信息安全",
          children: [
            {
              value: "一班",
              label: "一班",
            },
            {
              value: "二班",
              label: "二班",
            },
            {
              value: "三班",
              label: "三班",
            },
            {
              value: "四班",
              label: "四班",
            },
          ],
        },
        {
          value: "物联网",
          label: "物联网",
          children: [
            {
              value: "一班",
              label: "一班",
            },
            {
              value: "二班",
              label: "二班",
            },
          ],
        },
        {
          value: "数据科学与大数据技术",
          label: "数据科学与大数据技术",
          children: [
            {
              value: "一班",
              label: "一班",
            },
            {
              value: "二班",
              label: "二班",
            },
          ],
        },
        {
          value: "计算机科学与技术（合作）",
          label: "计算机科学与技术（合作）",
          children: [
            {
              value: "一班",
              label: "一班",
            },
            {
              value: "二班",
              label: "二班",
            },
            {
              value: "三班",
              label: "三班",
            },
            {
              value: "四班",
              label: "四班",
            },
            {
              value: "五班",
              label: "五班",
            },
            {
              value: "六班",
              label: "六班",
            },
          ],
        },
      ],
      organizationData: [
        {
          label: "--请选择--",
          children: [
            {
              label: "--请选择--",
            },
          ],
        },
        {
          value: "科技协会", // value是真正存储在后端的值，也是前端需要传给后端的参数，一般来说是数字
          label: "科技协会", // label是value值对应的标签，用于对应数据和信息
          children: [
            {
              value: "科技协会",
              label: "科技协会",
            },
          ],
        },
        {
          value: "团委",
          label: "团委",
          children: [
            {
              value: "组织部",
              label: "组织部",
            },
            {
              value: "宣传部",
              label: "宣传部",
            },
            {
              value: "心协",
              label: "心协",
            },
            {
              value: "青协",
              label: "青协",
            },
          ],
        },
        {
          value: "学生会",
          label: "学生会",
          children: [
            {
              value: "办公室",
              label: "办公室",
            },
            {
              value: "学习部",
              label: "学习部",
            },
            {
              value: "宣传部",
              label: "宣传部",
            },
            {
              value: "文艺部",
              label: "文艺部",
            },
            {
              value: "体育部",
              label: "体育部",
            },
            {
              value: "外联部",
              label: "外联部",
            },
            {
              value: "自管会",
              label: "自管会",
            },
          ],
        },
        {
          value: "勤工助学中心",
          label: "勤工助学中心",
          children: [
            {
              value: "管理部",
              label: "管理部",
            },
            {
              value: "活动部",
              label: "活动部",
            },
            {
              value: "助贷部",
              label: "助贷部",
            },
            {
              value: "外联部",
              label: "外联部",
            },
          ],
        },
        {
          value: "新闻中心",
          label: "新闻中心",
          children: [
            {
              value: "摄影协会",
              label: "摄影协会",
            },
            {
              value: "新媒体部",
              label: "新媒体部",
            },
            {
              value: "记者团",
              label: "记者团",
            },
          ],
        },
      ],
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 3 到 10 个字", trigger: "blur" },
        ],
        studentId: [
          { required: true, message: "请输入学号", trigger: "blur" },
          { type: "number", message: "请输入正确的学号", trigger: "blur" },
        ],
        qq: [
          { required: true, message: "请输入qq号", trigger: "blur" },
          { type: "number", message: "请输入正确的qq号", trigger: "blur" },
        ],
        phoneNum: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { type: "number", message: "请输入正确的手机号", trigger: "blur" },
        ],
        major: [{ required: true, message: "请选择专业", trigger: "blur" }],
        className: [{ required: true, message: "请选择班级", trigger: "blur" }],
        organizationName1: [
          { required: true, message: "请选择志愿", trigger: "blur" },
        ],
        branch1: [{ required: true, message: "请选择部门", trigger: "blur" }],
        reason1: [{ required: true, message: "请输入原因", trigger: "blur" }],
      },
    };
  },
  methods: {
    deleteRow(index, rows, id) {
      request({
        method: "post",
        url: "/deleteForm",
        data: {
          studentId: id + "",
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((a) => {
          console.log(a);
        })
        .then((a) => {
          request({
            method: "get",
            url: "/get/allForm",
            params: {
              page: this.currenPageNum + "", //第几页
              numPerPage: this.everyPageNum + "", //每页多少条数据
            },
            headers: {
              "Content-Type": "application/json",
            },
          }).then((getForm) => {
            // console.log(getForm);
            this.tableData = getForm.data.data;
          });
        });
      // console.log(rows);
      // console.log(index);
      // console.log(id);
      // rows.splice(index, 1);
    },

    exit() {
      // console.log("销毁token");
      // localStorage.removeItem("token");
      this.$router.replace({
        name: "apply",
      });
    },

    getSearch() {
      request({
        method: "get",
        url: "/get/searchForm",
        params: {
          keyWord: this.search,
          page: this.currenPageNum + "", //第几页
          numPerPage: this.everyPageNum + "", //每页多少条数据
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((getForm) => {
        // console.log(getForm);
        this.tableData = getForm.data.data;
      });
    },

    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.everyPageNum = val;
      request({
        method: "get",
        url: "/get/allForm",
        params: {
          page: this.currenPageNum + "", //第几页
          numPerPage: this.everyPageNum + "", //每页多少条数据
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((getForm) => {
        // console.log(getForm);
        this.tableData = getForm.data.data;
      });
    },

    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currenPageNum = val;
      request({
        method: "get",
        url: "/get/allForm",
        params: {
          page: this.currenPageNum + "", //第几页
          numPerPage: this.everyPageNum + "", //每页多少条数据
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((getForm) => {
        // console.log(getForm);
        this.tableData = getForm.data.data;
      });
    },
    getMajorIndex(index) {
      this.majorIndex = index;
      // console.log(index);
      // console.log(this.majorData[index]);
    },
    getWantIndex(index) {
      this.wantIndex = index;
      // console.log(index);
      // console.log(this.organizationData[index]);
    },
    getWantIndex2(index) {
      this.wantIndex2 = index;
      // console.log(index);
      // console.log(this.organizationData[index]);
    },
    popUp(index, rows, id) {
      this.dialogFormVisible = true;
      this.idLock = true;
      for (let k in rows[index]) {
        this.form[k] = rows[index][k];
        // console.log(rows[index][k]);
      }
      if (rows[index].isDispensing === 1) {
        this.form.isDispensing = true;
      } else {
        this.form.isDispensing = false;
      }
      // console.log(this.form)
      // console.log(index)
      // console.log(rows[index])
      // console.log(id)
    },
    addUp() {
      this.dialogFormVisible = true;
      this.idLock = false;
      this.form = {
        studentId: "",
        qq: "",
        name: "",
        phoneNum: "",
        major: "",
        className: "",
        // 必填
        organizationName1: "", // 组织名 必填
        branch1: "", // 组织下属部门 必填
        reason1: "", // 原因 必填
        // 选填
        organizationName2: "", // 组织名 选填
        branch2: "", // 组织下属部门 选填
        reason2: "", // 原因 选填
        isDispensing: false,
      };
    },
    submitForm() {
      // console.log(form);
      this.$axios({
        method: "post",
        url: "http://82.157.249.75:6789/api/post/form",
        data: this.upForm,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        // console.log(response);
        if (response.data.status !== "00000") {
          this.$message({
            showClose: true,
            message: "请检查你的信息！！！",
            type: "error",
          });
        } else {
          this.dialogFormVisible = false;
          this.$message({
            showClose: true,
            message: "恭喜你，成功提交！！！",
            type: "success",
          });
          request({
            method: "get",
            url: "/get/allForm",
            params: {
              page: this.currenPageNum + "", //第几页
              numPerPage: this.everyPageNum + "", //每页多少条数据
            },
            headers: {
              "Content-Type": "application/json",
            },
          }).then((getForm) => {
            // console.log(getForm);
            this.tableData = getForm.data.data;
          });
        }
      });
    },
  },

  computed: {
    upForm: function () {
      if (
        this.form.organizationName2 === "" ||
        this.form.organizationName2 === null
      ) {
        return {
          studentId: this.form.studentId + "", //学号 必填
          name: this.form.name, //姓名 必填
          qq: this.form.qq + "", //QQ号码 必填
          phoneNum: this.form.phoneNum + "", //手机号  必填
          //专业和班级必须符合文档中的数据
          major: this.form.major, //专业 必填
          className: this.form.className, //班级  必填

          organization1: {
            // 必填
            organizationName: this.form.organizationName1, // 组织名 必填
            branch: this.form.branch1, // 组织下属部门 必填
            reason: this.form.reason1, // 原因 必填
          },
          isDispensing: !!this.form.isDispensing, //是否接受调剂
        };
      } else {
        return {
          //报名表以学号为唯一认证，同一学号多次提交会以最后一次覆盖
          studentId: this.form.studentId + "", //学号 必填
          name: this.form.name, //姓名 必填
          qq: this.form.qq + "", //QQ号码 必填
          phoneNum: this.form.phoneNum + "", //手机号  必填
          //专业和班级必须符合文档中的数据
          major: this.form.major, //专业 必填
          className: this.form.className, //班级  必填

          organization1: {
            // 必填
            organizationName: this.form.organizationName1, // 组织名 必填
            branch: this.form.branch1, // 组织下属部门 必填
            reason: this.form.reason1, // 原因 必填
          },
          organization2: {
            // 组织2选填
            organizationName: this.form.organizationName2,
            branch: this.form.branch2,
            reason: this.form.reason2,
          },
          isDispensing: !!this.form.isDispensing, //是否接受调剂
        };
      }
    },
  },
};
</script>

<style>
.allManagement {
  height: 100%;
  width: 100%;
}
.el-header {
  background-color: #dcdfe6;
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
.searchFrame {
  width: 300px;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
}
.searchButton {
  width: 40px;
  height: 40px;
  margin-left: 5px;
  margin-bottom: 20px;
}
.main {
  height: 85vh;
}
.addMessage {
  width: 40px;
  height: 40px;
  margin-left: 15px;
  margin-bottom: 20px;
}
</style>