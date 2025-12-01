<template>
  <div class="register-page">
    <h2 class="title">用户注册</h2>

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
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
          clearable
        />

        <van-field
          v-model="form.nickname"
          label="昵称"
          placeholder="请输入昵称"
          required
          clearable
        />

        <van-field
          v-model="form.invite_code"
          label="邀请码"
          placeholder="若为管理员请输入邀请码（可空）"
          clearable
        />
      </van-cell-group>

      <div class="btn-box">
        <van-button round block type="primary" native-type="submit">
          注册
        </van-button>

        <van-button
          round
          block
          type="default"
          class="login-btn"
          @click="goLogin"
        >
          返回登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { register } from '@/api/auth'

const router = useRouter()

const form = reactive({
  username: '',
  password: '',
  nickname: '',
  invite_code: ''  // 可为空
})

const onSubmit = async () => {
  if (!form.username || !form.password || !form.nickname) {
    showToast("请填写完整信息")
    return
  }

  try {
    const res = await register(form)
    showToast("注册成功，请登录！")

    router.push("/login")
  } catch (err: any) {
    showToast(err?.response?.data?.error || '注册失败')
  }
}

const goLogin = () => {
  router.push("/login")
}
</script>

<style scoped>
.register-page {
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

.login-btn {
  margin-top: 10px;
}
</style>
