<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <img class="avatar_img" id="rry" src="../assets/logo2.jpg" alt />
      </div>
      <el-form
        :model="loginUser"
        :rules="rules"
        ref="loginForm"
        class="loginForm"
        label-width="60px"
      >
        <el-form-item label="学号" prop="username">
          <el-input v-model="loginUser.username" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登 录</el-button>
        </el-form-item>
        <div class="tiparea">
          <p>
            还没有账号？现在
            <router-link to="/register">注册</router-link>
          </p>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'

export default {
  name: 'login',
  data() {
    return {
      loginUser: {
        email: '',
        password: '',
      },
      rules: {
        username: [
          {
            min: 10,
            max: 14,
            required: true,
            message: '学号格式不正确',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {
            min: 6,
            max: 30,
            message: '长度在 6 到 30 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/login', this.loginUser).then((res) => {
            if (res.data.meta != '0') {
              // 登录成功
              this.$message({
                showClose: true,
                message: '登陆成功',
                type: 'success',
              })

              const token = res.data.token
              localStorage.setItem('eleToken', token)
              // 页面跳转
              this.$router.push('/index')
            } else {
              // 登录失败
              this.$message.error('账号或密码错误')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // isEmpty(value) {
    //   return (
    //     value === undefined ||
    //     value === null ||
    //     (typeof value === 'object' && Object.keys(value).length === 0) ||
    //     (typeof value === 'string' && value.trim().length === 0)
    //   )
    // },
  },
}
</script>

<style class="lang" scoped>
.manage_tip {
  height: 100px;
  width: 100px;
  padding: 10%;
  border: 1px solid rgb(0, 238, 255);
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 100px rgb(43, 188, 255);
  margin-left: auto;
  margin-right: auto;
  position: relative;
  transform: translate(-0%, -50%);
  top: 50px;
}
.avatar_img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: white;
}
#rry {
  -webkit-transition-property: -webkit-transform;

  -webkit-transition-duration: 3s;

  -moz-transition-property: -moz-transform;

  -moz-transition-duration: 3s;

  -webkit-animation: rotate 9s linear infinite;

  -moz-animation: rotate 9s linear infinite;

  -o-animation: rotate 9s linear infinite;

  animation: rotate 9s linear infinite;
}
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/logo3.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 20%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: 'Microsoft YaHei';
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>


