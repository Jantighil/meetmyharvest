const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const productsRoutes = require("./routes/products");
const farmersRoutes = require("./routes/farmers");
const buyersRoutes = require("./routes/buyers");
const registrationsRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
// const adminsRoutes = require("./routes/administrator");

app.use(express.json());
app.use(morgan("tiny"));
app.use("/items", cors(), productsRoutes);
app.use("/farmers", cors(), farmersRoutes);
app.use("/buyers", cors(), buyersRoutes);
app.use("/auth", cors(), registrationsRoutes);
app.use("/login", cors(), loginRoutes);
// app.use("/admin", cors(), adminsRoutes);
app.use(cors());

app.use((req, res, next) =>  {
    let err = new Error("Not Found" );
    err.status = 404;
    return next(err);
});

if (app.get("env") === "development" ) {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        return res.json({
            message: err.message,
            error: err
        });
    });
}

app.listen(8000, (req, res) => {
    console.log("Server is running on port 8000. Goto 'http://localhost:8000' on your browser...");
})