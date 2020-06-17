const express = require('express');
const e = require('express');
const app = express();

const mainRoutes = require('./routes/mainRoutes');

app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use('/', mainRoutes);

const PORT = 4000;

app.listen(PORT , () => {
    console.log(`Server is running on ${PORT}`);
})
