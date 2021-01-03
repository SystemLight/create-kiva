/**
 * 基于antd和ProForm的表单组件自定义拓展
 */
export * from "./ChoFormMapSelect";

/**
 * 适合全屏展示表单时单个字段布局预设
 */
export const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 7}
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
        md: {span: 10}
    }
};

/**
 * 适合全屏展示表单时提交布局预设
 */
export const submitFormLayout = {
    wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 10, offset: 7}
    }
};
