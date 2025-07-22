const express = require('express');
const router = express.Router();
const { DrugMaster, ItemMaster } = require('./../models/dataModel');

router.get('/join', async (req, res) => {
  const data = await DrugMaster.aggregate([
    {
      $lookup: {
        from: 'itemmasters',
        localField: 'drug_code',
        foreignField: 'item_code',
        as: 'item_details'
      }
    }
  ]);
  res.json(data);
});


router.put('/swap-rates', async (req, res) => {
  const items = await ItemMaster.find();
  for (let item of items) {
    await ItemMaster.findByIdAndUpdate(item._id, {
      purchase_rate: item.sales_rate,
      sales_rate: item.purchase_rate
    });
  }
  res.send("Rates Swapped");
});


router.get('/second-largest-purchase', async (req, res) => {
  const data = await ItemMaster.find().sort({ purchase_rate: -1 }).skip(1).limit(1);
  res.json(data);
});


router.get('/sum-rates', async (req, res) => {
  const data = await ItemMaster.aggregate([
    {
      $group: {
       
        totalPurchase: { $sum: "$purchase_rate" },
        totalSales: { $sum: "$sales_rate" }
      }
    }
  ]);
  res.json(data);
});


router.get('/common', async (req, res) => {
  const data = await DrugMaster.aggregate([
    {
      $lookup: {
        from: 'itemmasters',
        localField: 'drug_code',
        foreignField: 'item_code',
        as: 'common'
      }
    },
    { $match: { common: { $ne: [] } } }
  ]);
  res.json(data);
});

module.exports = router;
