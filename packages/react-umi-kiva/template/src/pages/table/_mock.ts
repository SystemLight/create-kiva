import {Request, Response} from "express";
import mockjs from "mockjs";

export default {
    /**
     * 表格数据mock接口
     * @param {Request} req
     * @param {Response} res
     */
    "GET /api/basic-table": mockjs.mock({
        "data|10": [{"id|+1": 1, "name": "@string('lower', 5, 20)", "age|10-60": 0, "address": "西湖区湖底公园@datetime"}]
    }).data
};
