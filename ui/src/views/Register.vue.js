import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { showToast } from 'vant';
import { register } from '@/api/auth';
const router = useRouter();
const form = reactive({
    username: '',
    password: '',
    nickname: '',
    invite_code: '' // 可为空
});
const onSubmit = async () => {
    if (!form.username || !form.password || !form.nickname) {
        showToast("请填写完整信息");
        return;
    }
    try {
        const res = await register(form);
        showToast("注册成功，请登录！");
        router.push("/login");
    }
    catch (err) {
        showToast(err?.response?.data?.error || '注册失败');
    }
};
const goLogin = () => {
    router.push("/login");
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "register-page" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "title" },
});
const __VLS_0 = {}.VanForm;
/** @type {[typeof __VLS_components.VanForm, typeof __VLS_components.vanForm, typeof __VLS_components.VanForm, typeof __VLS_components.vanForm, ]} */ ;
// @ts-ignore
VanForm;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onSubmit': {} },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onSubmit': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ submit: {} },
    { onSubmit: (__VLS_ctx.onSubmit) });
const { default: __VLS_7 } = __VLS_3.slots;
// @ts-ignore
[onSubmit,];
const __VLS_8 = {}.VanCellGroup;
/** @type {[typeof __VLS_components.VanCellGroup, typeof __VLS_components.vanCellGroup, typeof __VLS_components.VanCellGroup, typeof __VLS_components.vanCellGroup, ]} */ ;
// @ts-ignore
VanCellGroup;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    inset: true,
}));
const __VLS_10 = __VLS_9({
    inset: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
const { default: __VLS_13 } = __VLS_11.slots;
const __VLS_14 = {}.VanField;
/** @type {[typeof __VLS_components.VanField, typeof __VLS_components.vanField, ]} */ ;
// @ts-ignore
VanField;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
    modelValue: (__VLS_ctx.form.username),
    label: "用户名",
    placeholder: "请输入用户名",
    required: true,
    clearable: true,
}));
const __VLS_16 = __VLS_15({
    modelValue: (__VLS_ctx.form.username),
    label: "用户名",
    placeholder: "请输入用户名",
    required: true,
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
// @ts-ignore
[form,];
const __VLS_20 = {}.VanField;
/** @type {[typeof __VLS_components.VanField, typeof __VLS_components.vanField, ]} */ ;
// @ts-ignore
VanField;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    modelValue: (__VLS_ctx.form.password),
    type: "password",
    label: "密码",
    placeholder: "请输入密码",
    required: true,
    clearable: true,
}));
const __VLS_22 = __VLS_21({
    modelValue: (__VLS_ctx.form.password),
    type: "password",
    label: "密码",
    placeholder: "请输入密码",
    required: true,
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
// @ts-ignore
[form,];
const __VLS_26 = {}.VanField;
/** @type {[typeof __VLS_components.VanField, typeof __VLS_components.vanField, ]} */ ;
// @ts-ignore
VanField;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    modelValue: (__VLS_ctx.form.nickname),
    label: "昵称",
    placeholder: "请输入昵称",
    required: true,
    clearable: true,
}));
const __VLS_28 = __VLS_27({
    modelValue: (__VLS_ctx.form.nickname),
    label: "昵称",
    placeholder: "请输入昵称",
    required: true,
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
// @ts-ignore
[form,];
const __VLS_32 = {}.VanField;
/** @type {[typeof __VLS_components.VanField, typeof __VLS_components.vanField, ]} */ ;
// @ts-ignore
VanField;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    modelValue: (__VLS_ctx.form.invite_code),
    label: "邀请码",
    placeholder: "若为管理员请输入邀请码（可空）",
    clearable: true,
}));
const __VLS_34 = __VLS_33({
    modelValue: (__VLS_ctx.form.invite_code),
    label: "邀请码",
    placeholder: "若为管理员请输入邀请码（可空）",
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
// @ts-ignore
[form,];
var __VLS_11;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "btn-box" },
});
const __VLS_38 = {}.VanButton;
/** @type {[typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, ]} */ ;
// @ts-ignore
VanButton;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
    round: true,
    block: true,
    type: "primary",
    nativeType: "submit",
}));
const __VLS_40 = __VLS_39({
    round: true,
    block: true,
    type: "primary",
    nativeType: "submit",
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
const { default: __VLS_43 } = __VLS_41.slots;
var __VLS_41;
const __VLS_44 = {}.VanButton;
/** @type {[typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, ]} */ ;
// @ts-ignore
VanButton;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    ...{ 'onClick': {} },
    round: true,
    block: true,
    type: "default",
    ...{ class: "login-btn" },
}));
const __VLS_46 = __VLS_45({
    ...{ 'onClick': {} },
    round: true,
    block: true,
    type: "default",
    ...{ class: "login-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
let __VLS_49;
const __VLS_50 = ({ click: {} },
    { onClick: (__VLS_ctx.goLogin) });
const { default: __VLS_51 } = __VLS_47.slots;
// @ts-ignore
[goLogin,];
var __VLS_47;
var __VLS_48;
var __VLS_3;
var __VLS_4;
/** @type {__VLS_StyleScopedClasses['register-page']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-box']} */ ;
/** @type {__VLS_StyleScopedClasses['login-btn']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
