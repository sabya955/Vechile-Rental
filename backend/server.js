const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const routes = require("./routes/index");
app.use("/api", routes); 

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
