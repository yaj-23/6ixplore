const express = require('express');
const authRoutes = require('./routes/AuthRoutes');
const exploreRoutes = require('./routes/ExploreRoutes');
const userRoutes = require('./routes/UserRoutes');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use('/', authRoutes, exploreRoutes, userRoutes);

app.listen(PORT, () => {
    console.log("Server listening on port", PORT);
});
