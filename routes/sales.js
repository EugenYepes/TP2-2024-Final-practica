import express from "express";
import { getAllSales, getSaleById, getSalesFromLocation, getSalesWithFilters, getSalesSortSatisfaction } from "../data/sales.js";

const router = express.Router();

router.get("/sortSatisfaction/", async (req, res) => {
	const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
	const page = req.query.page ? parseInt(req.query.page) : 0;

	res.json(await getSalesSortSatisfaction(pageSize, page));
})

router.get("/filterSale/", async (req, res) => {
	const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
	const page = req.query.page ? parseInt(req.query.page) : 0;
	const location = req.query.location;
	const purchaseMethod = req.query.purchaseMethod;
	const couponUsed = req.query.couponUsed;

	res.json(await getSalesWithFilters(pageSize, page, location, purchaseMethod, couponUsed));
})


router.get("/storeLocation/:location", async (req, res) => {
	const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
	const page = req.query.page ? parseInt(req.query.page) : 0;
	const location = req.params.location;

	res.json(await getSalesFromLocation(pageSize, page, location));
})

router.get("/:id", async (req, res) => {
	const id = req.params.id;

	res.json(await getSaleById(id));
})

router.get("/", async (req, res) => {
	const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
	const page = req.query.page ? parseInt(req.query.page) : 0;

	res.json(await getAllSales(pageSize, page));
});

export default router;
