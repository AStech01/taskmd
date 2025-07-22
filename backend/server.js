const express = require('express');
const app = express();
const cors = require('cors');
require('./db');

const queryRoutes = require('./routes/queryRoutes');

app.use(cors());
app.use(express.json());
app.use('/api/query', queryRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
