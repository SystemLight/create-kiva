import {Soul} from "kiva";

const soul = new Soul();

// region 注册CommonModel
import CommonModel, {ICommonState} from "@/models/common";

export * from "./common";
soul.register(CommonModel);

// endregion

export interface IStates {
    common: ICommonState
}

export default soul;
