import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { showToast } from "vant";
import { getMe } from "@/api/auth";
import { getMessages, getAllMessages, postMessage, deleteMessage, approveMessage, rejectMessage } from "@/api/message";
const router = useRouter();
const user = ref(null);
const messages = ref([]);
const content = ref("");
const showEditor = ref(false);
const roleText = (role) => role === "admin" ? "管理员" : "普通用户";
const toggleEditor = () => (showEditor.value = !showEditor.value);
// -------------------- 用户 --------------------
const loadUser = async () => {
    const token = localStorage.getItem("token");
    if (!token)
        return;
    try {
        const res = await getMe();
        user.value = res;
    }
    catch {
        localStorage.removeItem("token");
    }
};
// -------------------- 留言 --------------------
const loadMessages = async () => {
    let list = [];
    if (user.value?.role === "admin") {
        const resAdmin = await getAllMessages();
        const rawList = resAdmin.messages || [];
        // 映射字段统一成前端期望
        list = rawList.map((m) => ({
            id: m.ID,
            user_id: m.UserID,
            nickname: m.User?.Nickname || "未知",
            content: m.Content,
            status: m.Status,
            created_at: m.CreatedAt,
            updated_at: m.UpdatedAt
        }));
    }
    else {
        const resUser = await getMessages();
        list = resUser.messages || [];
    }
    if (!user.value) {
        messages.value = list.filter((m) => m.status === "approved");
    }
    else if (user.value.role !== "admin") {
        messages.value = list.filter((m) => m.status === "approved" || m.user_id === user.value.id);
    }
    else {
        // admin 全部显示
        messages.value = list;
    }
};
const statusText = (msg) => {
    const map = {
        approved: "",
        pending: "待审核",
        rejected: "已拒绝"
    };
    return map[msg.status] || "";
};
const formatTime = (t) => {
    return new Date(t).toLocaleString();
};
// -------------------- 操作 --------------------
const sendMessage = async () => {
    if (!content.value.trim()) {
        showToast("留言内容不能为空");
        return;
    }
    try {
        await postMessage(content.value);
        showToast("提交成功，等待审核");
        content.value = "";
        showEditor.value = false;
        loadMessages();
    }
    catch (err) {
        showToast(err?.response?.data?.error || "提交失败");
    }
};
const deleteMsg = async (id) => {
    await deleteMessage(id);
    showToast("删除成功");
    loadMessages();
};
const approve = async (id) => {
    await approveMessage(id);
    showToast("已通过");
    loadMessages();
};
const reject = async (id) => {
    await rejectMessage(id);
    showToast("已拒绝");
    loadMessages();
};
// -------------------- 登录/退出 --------------------
const goLogin = () => router.push("/login");
const logout = async () => {
    localStorage.removeItem("token");
    user.value = null;
    await loadMessages();
    showToast("已退出");
};
// -------------------- 初始化 --------------------
onMounted(async () => {
    await loadUser();
    await loadMessages();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['user-text']} */ ;
/** @type {__VLS_StyleScopedClasses['nickname']} */ ;
/** @type {__VLS_StyleScopedClasses['status']} */ ;
/** @type {__VLS_StyleScopedClasses['status']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "home-page" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "header" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "title" },
});
if (__VLS_ctx.user) {
    // @ts-ignore
    [user,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "user-info" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "user-text" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "nickname" },
    });
    (__VLS_ctx.user.nickname);
    // @ts-ignore
    [user,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "role" },
    });
    (__VLS_ctx.roleText(__VLS_ctx.user.role));
    // @ts-ignore
    [user, roleText,];
    const __VLS_0 = {}.VanButton;
    /** @type {[typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, ]} */ ;
    // @ts-ignore
    VanButton;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ 'onClick': {} },
        size: "small",
        type: "danger",
        ...{ class: "logout-btn" },
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onClick': {} },
        size: "small",
        type: "danger",
        ...{ class: "logout-btn" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_5;
    const __VLS_6 = ({ click: {} },
        { onClick: (__VLS_ctx.logout) });
    const { default: __VLS_7 } = __VLS_3.slots;
    // @ts-ignore
    [logout,];
    var __VLS_3;
    var __VLS_4;
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    const __VLS_8 = {}.VanButton;
    /** @type {[typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, ]} */ ;
    // @ts-ignore
    VanButton;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        ...{ 'onClick': {} },
        size: "small",
        type: "primary",
    }));
    const __VLS_10 = __VLS_9({
        ...{ 'onClick': {} },
        size: "small",
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    let __VLS_13;
    const __VLS_14 = ({ click: {} },
        { onClick: (__VLS_ctx.goLogin) });
    const { default: __VLS_15 } = __VLS_11.slots;
    // @ts-ignore
    [goLogin,];
    var __VLS_11;
    var __VLS_12;
}
const __VLS_16 = {}.VanDivider;
/** @type {[typeof __VLS_components.VanDivider, typeof __VLS_components.vanDivider, ]} */ ;
// @ts-ignore
VanDivider;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({}));
const __VLS_18 = __VLS_17({}, ...__VLS_functionalComponentArgsRest(__VLS_17));
if (__VLS_ctx.user) {
    // @ts-ignore
    [user,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "write-btn-box" },
    });
    const __VLS_22 = {}.VanButton;
    /** @type {[typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, ]} */ ;
    // @ts-ignore
    VanButton;
    // @ts-ignore
    const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
        ...{ 'onClick': {} },
        icon: "edit",
        type: "primary",
        round: true,
        block: true,
    }));
    const __VLS_24 = __VLS_23({
        ...{ 'onClick': {} },
        icon: "edit",
        type: "primary",
        round: true,
        block: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_23));
    let __VLS_27;
    const __VLS_28 = ({ click: {} },
        { onClick: (__VLS_ctx.toggleEditor) });
    const { default: __VLS_29 } = __VLS_25.slots;
    // @ts-ignore
    [toggleEditor,];
    var __VLS_25;
    var __VLS_26;
}
const __VLS_30 = {}.VanPopup;
/** @type {[typeof __VLS_components.VanPopup, typeof __VLS_components.vanPopup, typeof __VLS_components.VanPopup, typeof __VLS_components.vanPopup, ]} */ ;
// @ts-ignore
VanPopup;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    show: (__VLS_ctx.showEditor),
    position: "bottom",
    round: true,
}));
const __VLS_32 = __VLS_31({
    show: (__VLS_ctx.showEditor),
    position: "bottom",
    round: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
const { default: __VLS_35 } = __VLS_33.slots;
// @ts-ignore
[showEditor,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "input-box" },
});
const __VLS_36 = {}.VanField;
/** @type {[typeof __VLS_components.VanField, typeof __VLS_components.vanField, ]} */ ;
// @ts-ignore
VanField;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    modelValue: (__VLS_ctx.content),
    rows: "3",
    autosize: true,
    type: "textarea",
    maxlength: "200",
    showWordLimit: true,
    placeholder: "写下你的留言吧~",
}));
const __VLS_38 = __VLS_37({
    modelValue: (__VLS_ctx.content),
    rows: "3",
    autosize: true,
    type: "textarea",
    maxlength: "200",
    showWordLimit: true,
    placeholder: "写下你的留言吧~",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
// @ts-ignore
[content,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "editor-actions" },
});
const __VLS_42 = {}.VanButton;
/** @type {[typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, ]} */ ;
// @ts-ignore
VanButton;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
    ...{ 'onClick': {} },
    type: "primary",
    round: true,
    block: true,
    ...{ class: "send-btn" },
}));
const __VLS_44 = __VLS_43({
    ...{ 'onClick': {} },
    type: "primary",
    round: true,
    block: true,
    ...{ class: "send-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
let __VLS_47;
const __VLS_48 = ({ click: {} },
    { onClick: (__VLS_ctx.sendMessage) });
const { default: __VLS_49 } = __VLS_45.slots;
// @ts-ignore
[sendMessage,];
var __VLS_45;
var __VLS_46;
const __VLS_50 = {}.VanButton;
/** @type {[typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, ]} */ ;
// @ts-ignore
VanButton;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
    ...{ 'onClick': {} },
    type: "default",
    round: true,
    block: true,
}));
const __VLS_52 = __VLS_51({
    ...{ 'onClick': {} },
    type: "default",
    round: true,
    block: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
let __VLS_55;
const __VLS_56 = ({ click: {} },
    { onClick: (__VLS_ctx.toggleEditor) });
const { default: __VLS_57 } = __VLS_53.slots;
// @ts-ignore
[toggleEditor,];
var __VLS_53;
var __VLS_54;
var __VLS_33;
const __VLS_58 = {}.VanDivider;
/** @type {[typeof __VLS_components.VanDivider, typeof __VLS_components.vanDivider, typeof __VLS_components.VanDivider, typeof __VLS_components.vanDivider, ]} */ ;
// @ts-ignore
VanDivider;
// @ts-ignore
const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({
    contentPosition: "left",
}));
const __VLS_60 = __VLS_59({
    contentPosition: "left",
}, ...__VLS_functionalComponentArgsRest(__VLS_59));
const { default: __VLS_63 } = __VLS_61.slots;
var __VLS_61;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "msg-list" },
});
for (const [msg] of __VLS_getVForSourceType((__VLS_ctx.messages))) {
    // @ts-ignore
    [messages,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "msg-item" },
        ...{ class: (msg.status) },
        key: (msg.id),
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "msg-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "nickname" },
    });
    (msg.nickname);
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "status" },
        ...{ class: (msg.status) },
    });
    (__VLS_ctx.statusText(msg));
    // @ts-ignore
    [statusText,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "msg-content" },
    });
    (msg.content);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "msg-footer" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "time" },
    });
    (__VLS_ctx.formatTime(msg.created_at));
    // @ts-ignore
    [formatTime,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "actions" },
    });
    if (__VLS_ctx.user && msg.user_id === __VLS_ctx.user.id) {
        // @ts-ignore
        [user, user,];
        const __VLS_64 = {}.VanButton;
        /** @type {[typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, ]} */ ;
        // @ts-ignore
        VanButton;
        // @ts-ignore
        const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
            ...{ 'onClick': {} },
            type: "danger",
            size: "mini",
            plain: true,
        }));
        const __VLS_66 = __VLS_65({
            ...{ 'onClick': {} },
            type: "danger",
            size: "mini",
            plain: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_65));
        let __VLS_69;
        const __VLS_70 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!(__VLS_ctx.user && msg.user_id === __VLS_ctx.user.id))
                        return;
                    __VLS_ctx.deleteMsg(msg.id);
                    // @ts-ignore
                    [deleteMsg,];
                } });
        const { default: __VLS_71 } = __VLS_67.slots;
        var __VLS_67;
        var __VLS_68;
    }
    if (__VLS_ctx.user?.role === 'admin' && msg.status === 'pending') {
        // @ts-ignore
        [user,];
        const __VLS_72 = {}.VanButton;
        /** @type {[typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, ]} */ ;
        // @ts-ignore
        VanButton;
        // @ts-ignore
        const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
            ...{ 'onClick': {} },
            size: "mini",
            type: "primary",
            plain: true,
        }));
        const __VLS_74 = __VLS_73({
            ...{ 'onClick': {} },
            size: "mini",
            type: "primary",
            plain: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_73));
        let __VLS_77;
        const __VLS_78 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!(__VLS_ctx.user?.role === 'admin' && msg.status === 'pending'))
                        return;
                    __VLS_ctx.approve(msg.id);
                    // @ts-ignore
                    [approve,];
                } });
        const { default: __VLS_79 } = __VLS_75.slots;
        var __VLS_75;
        var __VLS_76;
        const __VLS_80 = {}.VanButton;
        /** @type {[typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, ]} */ ;
        // @ts-ignore
        VanButton;
        // @ts-ignore
        const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
            ...{ 'onClick': {} },
            size: "mini",
            type: "danger",
            plain: true,
        }));
        const __VLS_82 = __VLS_81({
            ...{ 'onClick': {} },
            size: "mini",
            type: "danger",
            plain: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_81));
        let __VLS_85;
        const __VLS_86 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!(__VLS_ctx.user?.role === 'admin' && msg.status === 'pending'))
                        return;
                    __VLS_ctx.reject(msg.id);
                    // @ts-ignore
                    [reject,];
                } });
        const { default: __VLS_87 } = __VLS_83.slots;
        var __VLS_83;
        var __VLS_84;
    }
}
/** @type {__VLS_StyleScopedClasses['home-page']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['user-info']} */ ;
/** @type {__VLS_StyleScopedClasses['user-text']} */ ;
/** @type {__VLS_StyleScopedClasses['nickname']} */ ;
/** @type {__VLS_StyleScopedClasses['role']} */ ;
/** @type {__VLS_StyleScopedClasses['logout-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['write-btn-box']} */ ;
/** @type {__VLS_StyleScopedClasses['input-box']} */ ;
/** @type {__VLS_StyleScopedClasses['editor-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['send-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['msg-list']} */ ;
/** @type {__VLS_StyleScopedClasses['msg-item']} */ ;
/** @type {__VLS_StyleScopedClasses['msg-header']} */ ;
/** @type {__VLS_StyleScopedClasses['nickname']} */ ;
/** @type {__VLS_StyleScopedClasses['status']} */ ;
/** @type {__VLS_StyleScopedClasses['msg-content']} */ ;
/** @type {__VLS_StyleScopedClasses['msg-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['time']} */ ;
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
