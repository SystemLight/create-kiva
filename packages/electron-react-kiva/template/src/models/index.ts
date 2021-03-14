import {soul} from "kiva";

// 注意当前文件启用约定模型，请不要在这里编码任何内容
import {IAccessState} from "@/models/access";
import {ICommonState} from "@/models/common";

export interface IStates {
access: IAccessState,
common: ICommonState,

}
export * from "./access";
export * from "./common";

soul.register(require("@/models/access").default);
soul.register(require("@/models/common").default);

export const store = soul.createStore();
