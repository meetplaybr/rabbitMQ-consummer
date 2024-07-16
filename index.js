require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const config = require("./config");
const mongodbConnection = require("./db");
const path = require("path");
const productRoutes = require("./routes/product.routes")
const sseRoutes = require("./routes/sse.routes")


const {port, origin} = config;
const app = express();
// config express app
app.use(cors({origin, credentials: true}));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
// start db
mongodbConnection();

app.use(sseRoutes)
app.use("/api", productRoutes)
app.use(
  "/files",
  express.static(path.resolve(__dirname, "tmp", "uploads"))
);

const server = http.createServer(app);
server.listen(port, ()=> {
  console.log(`Server rodando em http://localhost:${port}`)
})
