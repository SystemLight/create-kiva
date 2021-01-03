import {Request, Response} from "express";
import mockjs from "mockjs";

/*
    mockJS语法规范参考：https://github.com/nuysoft/Mock/wiki/Syntax-Specification
    mockJS占位符参考：https://github.com/nuysoft/Mock/wiki/Mock.Random
 */

export default {
    /**
     * 数据测试mock接口
     */
    "GET /api/data": function(req: Request, res: Response) {
        res.status(200);
        res.json(mockjs.mock({
            "data|10": [{"name": "@city", "value|1-100": 50, "type|0-2": 1}]
        }));
        res.end();
    },

    /**
     * 错误测试mock接口
     * @param {Request} req
     * @param {Response} res
     */
    "GET /api/error": function(req: Request, res: Response) {
        res.sendStatus(400);
        res.end();
    }
};
