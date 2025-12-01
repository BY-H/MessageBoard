<template>
  <div class="login-page">
    <h2 class="title">用户登录</h2>

    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="form.username"
          label="用户名"
          placeholder="请输入用户名"
          required
          clearable
        />

        <van-field
          v-model="form.password"
          label="密码"
          placeholder="请输入密码"
          type="password"
          required
          clearable
        />
      </van-cell-group>

      <div class="btn-box">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>

        <van-button
          round
          block
          type="default"
          class="register-btn"
          @click="goRegister"
        >
          注册账号
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import request from '@/api/request'
import { login } from '@/api/auth'


const router = useRouter()

const form = reactive({
  username: '',
  password: ''
})

const onSubmit = async () => {
  if (!form.username || !form.password) {
    showToast('请输入完整信息')
    return
  }

  try {
    const res = await login(form)
    console.log(res)
    const token = res.token
    if (!token) {
      showToast('登录失败')
      return
    }

    localStorage.setItem('token', token)
    showToast('登录成功！')

    router.replace('/')
  } catch (err: any) {
    showToast(err?.response?.data?.error || '登录失败')
  }
}

const goRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
.login-page {
  padding: 20px;
}

.title {
  text-align: center;
  margin: 40px 0 30px;
  font-size: 24px;
  font-weight: bold;
}

.btn-box {
  margin-top: 20px;
}

.register-btn {
  margin-top: 10px;
}
</style>