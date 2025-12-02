import { ref } from 'vue';
import 'vant/lib/index.css';
/**
 * 全局 loading，用于以后:
 * - 登录状态检查
 * - 刷新 token
 * - 全局加载请求
 */
const loading = ref(false);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    id: "app",
});
if (__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    const __VLS_0 = {}.VanLoading;
    /** @type {[typeof __VLS_components.VanLoading, typeof __VLS_components.vanLoading, ]} */ ;
    // @ts-ignore
    VanLoading;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        size: "24px",
        type: "spinner",
        ...{ class: "global-loading" },
    }));
    const __VLS_2 = __VLS_1({
        size: "24px",
        type: "spinner",
        ...{ class: "global-loading" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
const __VLS_6 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
// @ts-ignore
RouterView;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
{
    const { default: __VLS_11 } = __VLS_9.slots;
    const [{ Component }] = __VLS_getSlotParameters(__VLS_11);
    const __VLS_12 = {}.transition;
    /** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
    // @ts-ignore
    Transition;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        name: "fade",
        mode: "out-in",
    }));
    const __VLS_14 = __VLS_13({
        name: "fade",
        mode: "out-in",
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    const { default: __VLS_17 } = __VLS_15.slots;
    const __VLS_18 = ((Component));
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({}));
    const __VLS_20 = __VLS_19({}, ...__VLS_functionalComponentArgsRest(__VLS_19));
    var __VLS_15;
    __VLS_9.slots['' /* empty slot name completion */];
}
var __VLS_9;
/** @type {__VLS_StyleScopedClasses['global-loading']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
