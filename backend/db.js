const mongoose = require('mongoose');
const { DrugMaster, ItemMaster } = require('./models/dataModel');

mongoose.connect('mongodb://localhost:27017/medicine', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log("MongoDB connected ");

 
  const drugCount = await DrugMaster.countDocuments();
  if (drugCount === 0) {
    await DrugMaster.insertMany([
      { drug_code: "D001", name: "Paracetamol" },
      { drug_code: "D002", name: "Ibuprofen" },
      { drug_code: "D003", name: "Cetirizine" }
    ]);
    console.log("Dummy DrugMaster data inserted ");
  }


  const itemCount = await ItemMaster.countDocuments();
  if (itemCount === 0) {
    await ItemMaster.insertMany([
      { item_code: "D001", name: "Paracetamol", purchase_rate: 5, sales_rate: 8 },
      { item_code: "D002", name: "Ibuprofen", purchase_rate: 6, sales_rate: 9 },
      { item_code: "D003", name: "Cetirizine", purchase_rate: 4, sales_rate: 7 },
      { item_code: "D004", name: "Amoxicillin", purchase_rate: 10, sales_rate: 15 }
    ]);
    console.log("Dummy ItemMaster data inserted ");
  }

})
.catch(err => {
  console.error("MongoDB connection failed ", err);
});
