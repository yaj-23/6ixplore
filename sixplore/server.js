const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.listen(PORT, () => {
    console.log("Server listening on port", PORT);
});

app.get("/test", (req, res) => {
    res.send("Test");
});



