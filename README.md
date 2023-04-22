## 简单介绍
>整个项目分成了三个页面 **apply（报名表提交页面）**、**login（登录页面）**、**management（管理页面）**。
***
## Apply（报名表提交页面）
> ### 样式   
> 用element-ui的组件建立体布局和样式（有一说一这玩意是的方便）。
```css
background: linear-gradient(to bottom right, #a8edea, #fed6e3);
/*渐变背景颜色,三个参数，第一个时方向，第二个是起点颜色，第三个是终点颜色*/
```

> ### 功能
> element-ui表单组件自带的表单验证。（真的好用）   
> 在表单中的**专业和班级**和**志愿和部门**的下拉选项框，我没有将他们的两个选项栏合并在一起（信息安全-一班），而是将他们分开成两个下拉选项框（信息安全）和（一班），利用**majorData**是一个数组的特性，设置一个事件绑定到选项框上，当选择时把该选项的下标存入到**data**中，然后班级的下拉框需要显示的选项利用班级的下标找到对应的信息。    
>提交表单将输入的所有内容存入到**data**中，一般将所有内容都填全时请求能正常发送，但是第二志愿没有填报时提交，后端返回的错误是第二志愿的志愿名不能为空字符串。
然后发现选填的意思不是给后端扔个空字符串过去，而是把提交的**form**中的**organization2**直接干掉（不给他传这个）。   
一个新的问题，如何在没填第二志愿是提交一个不包括**organization2**的**form**，而在填报时传入一个包括**organization2**的**form**。   
解决方法是创建一个计算属性，当**organization2.organizationName**为空时，利用**Object.entries（）**把**form**拆分成数组，再利用**filter(=>)**来把**organization2**过滤掉。在次之后提交的对象就不是**form**而是**upForm**。
```javascript
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
  }
```
> 后台登陆按钮是一个路由跳转按钮，简单粗暴我直接在**router-link**里扔个**el-button**。
***
## login（登录页面）
> ### 样式   
> 不出所料我还是用的element-ul的组件。  
> 一开始设置背景图片时遇到了图片不能平铺全屏的问题，结果给背景图片设置**height:100vh**整好了，获取当前视窗100%大小。（二次元表示这个妹妹我很喜欢）

> ### 功能
> 啊，我好像写啥有用的功能
> 在密码框中按回车提交表单，就给密码框绑定了 **@keyup.enter.native**触发事件。   
> 利用后端返回的信息来报错，登录成功后0.7秒自动跳转到**management**，并保存**token**。
```javascript
axios({/*此处省略*/}).then((responses) => {
        // console.log(responses.data);
        if (responses.data.status !== "00000") {
          this.$message.error(responses.data.message);
        } else {
          this.$message.success(responses.data.message);
          localStorage.setItem("token", responses.data.data.token);
          setTimeout(() => {
            this.$router.replace({
              name:'management'
          })
          }, 700);
        }
      });
```
***
## management（管理页面）
> ### 样式 
> 主体使用element-ui的页头、表格和分页组件。

> ### 功能
> 删除功能：像后端发送删除请求，删除成功后再次获取当前页的信息。  
> 编辑功能：用element-ui的对话框组件,然后把**apply**中的表单cv过来,将学号的输入框锁住，在对话框弹出时将学生内容传入。  
> 添加信息：与编辑功能同用一个对话框，只不过传入的都是空字符串，再把学号的输入框解锁。  
> 换页功能：换页时向后端发送请求获取当前页信息。  
> 返回：清除**token**，并跳转到**apply**。
