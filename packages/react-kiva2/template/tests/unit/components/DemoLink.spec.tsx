import React from "react";
import {shallow} from "enzyme";

import DemoLink from "@/components/DemoLink";

describe("测试", () => {
    it("测试 DemoLink", () => {
        const wrapper = shallow(<DemoLink page={"sdf"}>asdfdd</DemoLink>);
        expect(wrapper).toMatchSnapshot();
    });
});
