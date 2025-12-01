<template>
  <div class="home-page">

    <!-- 顶部栏 -->
    <div class="header">
      <h2 class="title">📌 留言板</h2>

      <!-- 用户信息 -->
      <div v-if="user" class="user-info">
        <div class="user-text">
          <div class="nickname">{{ user.nickname }}</div>
          <div class="role">{{ roleText(user.role) }}</div>
        </div>

        <van-button
          size="small"
          type="danger"
          class="logout-btn"
          @click="logout"
        >
          退出
        </van-button>
      </div>

      <!-- 登录按钮 -->
      <div v-else>
        <van-button size="small" type="primary" @click="goLogin">
          登录
        </van-button>
      </div>
    </div>

    <van-divider />

    <!-- 写留言按钮 -->
    <div v-if="user" class="write-btn-box">
      <van-button
        icon="edit"
        type="primary"
        round
        block
        @click="toggleEditor"
      >
        写留言
      </van-button>
    </div>

    <!-- 弹出留言输入框 -->
    <van-popup v-model:show="showEditor" position="bottom" round>
      <div class="input-box">
        <van-field
          v-model="content"
          rows="3"
          autosize
          type="textarea"
          maxlength="200"
          show-word-limit
          placeholder="写下你的留言吧~"
        />

        <div class="editor-actions">
          <van-button
            type="primary"
            round
            block
            class="send-btn"
            @click="sendMessage"
          >
            提交留言
          </van-button>

          <van-button
            type="default"
            round
            block
            @click="toggleEditor"
          >
            取消
          </van-button>
        </div>
      </div>
    </van-popup>

    <van-divider content-position="left">留言列表</van-divider>

    <!-- 留言列表 -->
    <div class="msg-list">
      <div
        class="msg-item"
        :class="msg.status"
        v-for="msg in messages"
        :key="msg.id"
      >
        <div class="msg-header">
          <div class="nickname">{{ msg.nickname }}</div>
          <span class="status" :class="msg.status">
            {{ statusText(msg) }}
          </span>
        </div>

        <div class="msg-content">{{ msg.content }}</div>

        <div class="msg-footer">
          <div class="time">{{ formatTime(msg.created_at) }}</div>
          <div class="actions">
            <!-- 用户自己可删除 -->
            <van-button
              v-if="user && msg.user_id === user.id"
              type="danger"
              size="mini"
              plain
              @click="deleteMsg(msg.id)"
            >
              删除
            </van-button>

            <!-- 管理员审核 -->
            <template v-if="user?.role === 'admin' && msg.status === 'pending'">
              <van-button
                size="mini"
                type="primary"
                plain
                @click="approve(msg.id)"
              >
                通过
              </van-button>

              <van-button
                size="mini"
                type="danger"
                plain
                @click="reject(msg.id)"
              >
                拒绝
              </van-button>
            </template>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { showToast } from "vant"
import { getMe } from "@/api/auth"
import {
  getMessages,
  getAllMessages,
  postMessage,
  deleteMessage,
  approveMessage,
  rejectMessage
} from "@/api/message"

const router = useRouter()

const user = ref<any>(null)
const messages = ref<any[]>([])
const content = ref("")
const showEditor = ref(false)

const roleText = (role: string) =>
  role === "admin" ? "管理员" : "普通用户"

const toggleEditor = () => (showEditor.value = !showEditor.value)

// -------------------- 用户 --------------------
const loadUser = async () => {
  const token = localStorage.getItem("token")
  if (!token) return
  try {
    const res = await getMe()
    user.value = res
  } catch {
    localStorage.removeItem("token")
  }
}

// -------------------- 留言 --------------------
const loadMessages = async () => {
  let list: any[] = []

  if (user.value?.role === "admin") {
    const resAdmin = await getAllMessages()
    const rawList = resAdmin.messages || []

    // 映射字段统一成前端期望
    list = rawList.map((m: any) => ({
      id: m.ID,
      user_id: m.UserID,
      nickname: m.User?.Nickname || "未知",
      content: m.Content,
      status: m.Status,
      created_at: m.CreatedAt,
      updated_at: m.UpdatedAt
    }))
  } else {
    const resUser = await getMessages()
    list = resUser.messages || []
  }

  if (!user.value) {
    messages.value = list.filter((m: any) => m.status === "approved")
  } else if (user.value.role !== "admin") {
    messages.value = list.filter(
      (m: any) => m.status === "approved" || m.user_id === user.value.id
    )
  } else {
    // admin 全部显示
    messages.value = list
  }
}


const statusText = (msg: any) => {
  const map: any = {
    approved: "",
    pending: "待审核",
    rejected: "已拒绝"
  }
  return map[msg.status] || ""
}

const formatTime = (t: string) => {
  return new Date(t).toLocaleString()
}

// -------------------- 操作 --------------------
const sendMessage = async () => {
  if (!content.value.trim()) {
    showToast("留言内容不能为空")
    return
  }
  try {
    await postMessage(content.value)
    showToast("提交成功，等待审核")
    content.value = ""
    showEditor.value = false
    loadMessages()
  } catch (err: any) {
    showToast(err?.response?.data?.error || "提交失败")
  }
}

const deleteMsg = async (id: number) => {
  await deleteMessage(id)
  showToast("删除成功")
  loadMessages()
}

const approve = async (id: number) => {
  await approveMessage(id)
  showToast("已通过")
  loadMessages()
}

const reject = async (id: number) => {
  await rejectMessage(id)
  showToast("已拒绝")
  loadMessages()
}

// -------------------- 登录/退出 --------------------
const goLogin = () => router.push("/login")

const logout = async () => {
  localStorage.removeItem("token")
  user.value = null
  await loadMessages()
  showToast("已退出")
}

// -------------------- 初始化 --------------------
onMounted(async () => {
  await loadUser()
  await loadMessages()
})
</script>

<style scoped>
.home-page {
  padding: 15px;
}

.title {
  margin: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-text .nickname {
  font-weight: bold;
  font-size: 14px;
}

.user-text .role {
  font-size: 12px;
  color: #888;
}

.write-btn-box {
  margin: 12px 0;
}

.input-box {
  padding: 15px;
}

.editor-actions {
  margin-top: 10px;
}

.msg-list {
  margin-top: 20px;
}

.msg-item {
  background: white;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.msg-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nickname {
  font-weight: bold;
}

.status {
  font-size: 12px;
  padding: 1px 6px;
  border-radius: 6px;
  background: #eee;
}

.status.pending {
  background: #fff7e6;
  color: #fa8c16;
}

.status.rejected {
  background: #ffe6e6;
  color: #ff4d4f;
}

.msg-content {
  margin: 10px 0;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
}

.msg-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.time {
  font-size: 12px;
  color: #888;
}

.actions {
  display: flex;
  gap: 6px;
}
</style>
