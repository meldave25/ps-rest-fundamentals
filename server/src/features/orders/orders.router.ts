import express from "express";
import { getOrderDetail, getOrders } from "./orders.service";
import { idUUIDRequestSchema, pagingRequestSchema } from "../types";
import { validate } from "../../middleware/validation.middleware";

export const ordersRouter = express.Router();

ordersRouter.get("/", validate(pagingRequestSchema),async (req,res) => {

    const data = pagingRequestSchema.parse(req);
    const orders = await getOrders(data.query.skip,data.query.take);
    res.json(orders);
    // const take = req.query.take;
    // const skip = req.query.skip;

    // if( take && typeof take === "string" && parseInt(take) >0 && skip && typeof(skip) === "string" && parseInt(skip) > -1){
    //     const orders = await getOrders(parseInt(skip),parseInt(take));
    //     res.json(orders);
    // } else {
    //     res.status(400).json({
    //         message:
    //         "Take and skip query parameters are required. " +
    //         "Take must be greater than 0 and skip must be greater than -1",
    //     });
    // }

    

    
});

ordersRouter.get("/:id", validate(idUUIDRequestSchema), async (req, res) => {
    const data = idUUIDRequestSchema.parse(req);
    const order = await getOrderDetail(data.params.id);
    if(order != null){
        res.json(order);
    } else {
        res.status(404).json({message: "Order not found"})
    }
});
