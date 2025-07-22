const mongoose = require('mongoose');

const DrugMasterSchema = new mongoose.Schema({
  drug_name: String,
  drug_code: String,
  drug_type: String,
  price: Number,
  corporate: Number,
  quantity: Number,
});

const ItemMasterSchema = new mongoose.Schema({
  item_name: String,
  item_code: String,
  purchase_rate: Number,
  sales_rate: Number,
  status: Number,
  quantity: Number,
});

const DrugMaster = mongoose.model('DrugMaster', DrugMasterSchema);
const ItemMaster = mongoose.model('ItemMaster', ItemMasterSchema);

module.exports = { DrugMaster, ItemMaster };
