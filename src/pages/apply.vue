<template>
  <div class="backgroundColor">
    <div class="allApply">
      <div class="title">
        <h3>天津理工大学计算机科学与工程学院</h3>
        <h3>学生组织报名系统</h3>
      </div>
      <h4 class="title">个人信息</h4>
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
            suffix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>

        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" suffix-icon="el-icon-user" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="qq号" prop="qq">
          <el-input
            v-model.number="form.qq"
            placeholder="请输入qq号"
            :maxlength="10"
            suffix-icon="el-icon-unlock"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNum">
          <el-input
            v-model.number="form.phoneNum"
            placeholder="请输入手机号"
            :maxlength="11"
            suffix-icon="el-icon-phone"
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
            prop="organization1.organizationName"
            class="left"
          >
            <el-select
              v-model="form.organization1.organizationName"
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

          <el-form-item label="下属部门" prop="organization1.branch">
            <el-select v-model="form.organization1.branch" placeholder="请选择">
              <el-option
                v-for="(c, index) in organizationData[wantIndex].children"
                :label="c.label"
                :value="c.value"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="原因" prop="organization1.reason">
          <el-input
            type="textarea"
            v-model="form.organization1.reason"
          ></el-input>
        </el-form-item>
        <div class="selectWant">
          <el-form-item label="第二志愿" class="left">
            <el-select
              v-model="form.organization2.organizationName"
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
            <el-select v-model="form.organization2.branch" placeholder="请选择">
              <el-option
                v-for="(c, index) in organizationData[wantIndex2].children"
                :label="c.label"
                :value="c.value"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="原因">
          <el-input
            type="textarea"
            v-model="form.organization2.reason"
          ></el-input>
        </el-form-item>
        <div class="adjust">
          <el-form-item label="是否调剂">
            <el-switch v-model="form.isDispensing"></el-switch>
          </el-form-item>
        </div>
        <div class="submit">
          <el-form-item>
            <el-button type="primary" @click="submitForm"
              >&nbsp;报&nbsp;&nbsp;&nbsp;&nbsp;名&nbsp;</el-button
            >
          </el-form-item>
          <el-form-item>
            <router-link to="/login"
              ><el-button type="primary" plain>后台登录</el-button></router-link
            >
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "apply",
  data() {
    return {
      majorIndex: 0,
      wantIndex: 0,
      wantIndex2: 0,
      form: {
        studentId: "",
        qq: "",
        name: "",
        phoneNum: "",
        major: "",
        className: "",
        organization1: {
          // 必填
          organizationName: "", // 组织名 必填
          branch: "", // 组织下属部门 必填
          reason: "", // 原因 必填
        },
        organization2: {
          // 选填
          organizationName: "", // 组织名 选填
          branch: "", // 组织下属部门 选填
          reason: "", // 原因 选填
        },
        isDispensing: "true",
      },
      majorData: [
        {
          label: "--请选择--",
          children: [
            {
              label: "--请选择--",
            }
          ]
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
          ]
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
        "organization1.organizationName": [
          { required: true, message: "请选择志愿", trigger: "blur" },
        ],
        "organization1.branch": [
          { required: true, message: "请选择部门", trigger: "blur" },
        ],
        "organization1.reason": [
          { required: true, message: "请输入原因", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      // console.log(this.upForm);
      this.upForm.studentId=this.form.studentId+"";
      this.upForm.qq=this.form.qq+"";
      this.upForm.phoneNum=this.form.phoneNum+"";
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$axios({
            method: "post",
            url: "http://82.157.249.75:6789/api/post/form",
            data: this.upForm,
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              // console.log(response);
              if (response.data.status !== "00000") {
                this.$message({
                showClose: true,
                message: "请检查你的信息！！！",
                type: "error",
              });
              }else{
                this.$message({
                  showClose: true,
                  message: "恭喜你，成功提交！！！",
                  type: "success",
                });
              }
            })
            .catch((error) => {
              // console.log(error);
              this.$message({
                showClose: true,
                message: "提交失败！！！",
                type: "error",
              });
            });
          // alert('submit!');
        } else {
          this.$message({
            showClose: true,
            message: "请检查填写信息！！！",
            type: "error",
          });
          return false;
        }
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
  },
  computed: {
    upForm: function () {
      if (this.form.organization2.organizationName === "") {
        let arr = Object.entries(this.form).filter(
          ([key, val]) => key !== "organization2"
        );
        let obj = Object.fromEntries(arr);
        return obj;
      } 
      else {
        return this.form;
      }
    },
  },
};
</script>

<style>
.allApply {
  background-color: #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 600px;
  padding: 20px;
  padding-right: 40px;
  padding-left: 30px;
}
.title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 10px;
  padding-left: 40px;
}
.selectWant,
.className,
.adjust {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.submit {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 70px;
}
h4 {
  margin-bottom: 5px;
}
.left {
  margin-right: 10px;
}
.backgroundColor {
  height: 100%;
  width: 100%;
  background: linear-gradient(to bottom right, #a8edea, #fed6e3);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>