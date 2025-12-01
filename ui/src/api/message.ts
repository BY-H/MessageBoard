// src/api/message.ts
import request from './request'

export interface Message {
  id: number
  user_id: number
  user_nickname: string
  content: string
  status: 'approved' | 'pending' | 'rejected'
  created_at: string
  updated_at?: string
}

/**
 * 获取留言列表
 */
export const getMessages = () => {
  return request.get<{ messages: Message[] }>('/messages')
}


/**
 * 管理员获取所有消息
 */
export const getAllMessages = () => request.get<{ messages: Message[] }>("/messages/all")

/**
 * 提交留言
 * @param content 留言内容
 */
export const postMessage = (content: string) => {
  return request.post('/messages', { content })
}

/**
 * 删除留言
 * @param id 留言 ID
 */
export const deleteMessage = (id: number) => {
  return request.delete(`/messages/${id}`)
}

/**
 * 审核通过
 * @param id 留言 ID
 */
export const approveMessage = (id: number) => {
  return request.patch(`/messages/${id}/approve`)
}

/**
 * 审核拒绝
 * @param id 留言 ID
 */
export const rejectMessage = (id: number) => {
  return request.patch(`/messages/${id}/reject`)
}
