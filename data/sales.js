import { ObjectId } from "mongodb";
import getConnection from "./conn.js";
const DATABASE = "sample_supplies";
const SALES = "sales";

async function getAllSales(pageSize, page) {
	const connectiondb = await getConnection();
	const sales = await connectiondb
		.db(DATABASE)
		.collection(SALES)
		.find({})
		.limit(pageSize)
		.skip(pageSize * page)
		.toArray();
	return sales;
}

async function getSaleById(id) {
	const connectiondb = await getConnection();
	const sale = await connectiondb
		.db(DATABASE)
		.collection(SALES)
		.findOne({ _id: new ObjectId(id) });

	return sale;
}

async function getSalesFromLocation(pageSize, page, location) {
	const connectiondb = await getConnection();
	const salesFromLocation = await connectiondb
		.db(DATABASE)
		.collection(SALES)
		// .find({ storeLocation: location })
		.find({ storeLocation: { $regex: new RegExp(location, 'i') } }) // seach with case insensitive
		.limit(pageSize)
		.skip(pageSize * page)
		.toArray();
	return salesFromLocation;
}

async function getSalesWithFilters(pageSize, page, location, purchaseMethod, couponUsed) {
	const connectiondb = await getConnection();
	const salesFiltered = await connectiondb
		.db(DATABASE)
		.collection(SALES)
		.find({
			storeLocation: { $regex: new RegExp(location, 'i') },
			purchaseMethod: { $regex: new RegExp(purchaseMethod, 'i') },
			couponUsed: couponUsed === 'true' // compare to a string because, here its an string
		})
		.limit(pageSize)
		.skip(pageSize * page)
		.toArray();

	return salesFiltered;
}

async function getSalesSortSatisfaction(pageSize, page) {
	const connectiondb = await getConnection();
	const salesSatisfactionOrder = await connectiondb
		.db(DATABASE)
		.collection(SALES)
		.find({})
		.sort({ 'customer.satisfaction': 1 })
		.limit(pageSize)
		.skip(pageSize * page)
		.toArray();

	return salesSatisfactionOrder;
}


export { getAllSales, getSaleById, getSalesFromLocation, getSalesWithFilters, getSalesSortSatisfaction };
