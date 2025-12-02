// src/api/message.ts
import request from './request';
/**
 * 获取留言列表
 */
export const getMessages = () => {
    return request.get('/messages');
};
/**
 * 管理员获取所有消息
 */
export const getAllMessages = () => request.get("/messages/all");
/**
 * 提交留言
 * @param content 留言内容
 */
export const postMessage = (content) => {
    return request.post('/messages', { content });
};
/**
 * 删除留言
 * @param id 留言 ID
 */
export const deleteMessage = (id) => {
    return request.delete(`/messages/${id}`);
};
/**
 * 审核通过
 * @param id 留言 ID
 */
export const approveMessage = (id) => {
    return request.patch(`/messages/${id}/approve`);
};
/**
 * 审核拒绝
 * @param id 留言 ID
 */
export const rejectMessage = (id) => {
    return request.patch(`/messages/${id}/reject`);
};
