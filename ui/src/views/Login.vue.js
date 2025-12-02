import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { showToast } from 'vant';
import { login } from '@/api/auth';
const router = useRouter();
const form = reactive({
    username: '',
    password: ''
});
const onSubmit = async () => {
    if (!form.username || !form.password) {
        showToast('请输入完整信息');
        return;
    }
    try {
        const res = await login(form);
        console.log(res);
        const token = res.token;
        if (!token) {
            showToast('登录失败');
            return;
        }
        localStorage.setItem('token', token);
        showToast('登录成功！');
        router.replace('/');
    }
    catch (err) {
        showToast(err?.response?.data?.error || '登录失败');
    }
};
const goRegister = () => {
    router.push('/register');
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "login-page" },
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
    label: "密码",
    placeholder: "请输入密码",
    type: "password",
    required: true,
    clearable: true,
}));
const __VLS_22 = __VLS_21({
    modelValue: (__VLS_ctx.form.password),
    label: "密码",
    placeholder: "请输入密码",
    type: "password",
    required: true,
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
// @ts-ignore
[form,];
var __VLS_11;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "btn-box" },
});
const __VLS_26 = {}.VanButton;
/** @type {[typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, ]} */ ;
// @ts-ignore
VanButton;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    round: true,
    block: true,
    type: "primary",
    nativeType: "submit",
}));
const __VLS_28 = __VLS_27({
    round: true,
    block: true,
    type: "primary",
    nativeType: "submit",
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
const { default: __VLS_31 } = __VLS_29.slots;
var __VLS_29;
const __VLS_32 = {}.VanButton;
/** @type {[typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, ]} */ ;
// @ts-ignore
VanButton;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    ...{ 'onClick': {} },
    round: true,
    block: true,
    type: "default",
    ...{ class: "register-btn" },
}));
const __VLS_34 = __VLS_33({
    ...{ 'onClick': {} },
    round: true,
    block: true,
    type: "default",
    ...{ class: "register-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
let __VLS_37;
const __VLS_38 = ({ click: {} },
    { onClick: (__VLS_ctx.goRegister) });
const { default: __VLS_39 } = __VLS_35.slots;
// @ts-ignore
[goRegister,];
var __VLS_35;
var __VLS_36;
var __VLS_3;
var __VLS_4;
/** @type {__VLS_StyleScopedClasses['login-page']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-box']} */ ;
/** @type {__VLS_StyleScopedClasses['register-btn']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
