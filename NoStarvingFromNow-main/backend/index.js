const mongoClient = require("mongodb").MongoClient;
// const cors = require("cors");
// app.use(cors());
const express = require("express")
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoClient.connect("mongodb://localhost:27017", (err, client) => {
    if (err) {
        console.log("Error");
    }
    else {
        db = client.db("donation");
    }
})
app.get("/",(req, res)=> {
    res.sendFile(__dirname+"/static/homepage.html");
})
app.get("/admin", (req, res)=> {
    res.sendFile(__dirname+"/static/admin.html");
})
app.get("/fooddetails", (req, res) => {
   res.sendFile(__dirname+"/static/fooddetails.html");
});
app.get("/about", (req, res) => {
    res.sendFile(__dirname+"/static/about.html");
 });
 app.get("/contact", (req, res) => {
    res.sendFile(__dirname+"/static/contact.html");
 });
app.get("/food", (req, res) => {
    db.collection("fooddetails").find().toArray((err, items) => {
        if (err) { }
        res.send(items);
    })
});
app.get("/getdonees", (req, res) => {
    res.sendFile(__dirname+"/static/donees.html");
 });
 app.get("/register", (req, res) => {
    res.sendFile(__dirname+"/static/register.html");
 });
app.post("/addfooddetails", (req, res) => {
    db.collection("fooddetails").insertOne({
        _id: req.body.phone,
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        fooditems: req.body.fooditems,
        quantity: req.body.quantity
    });
    console.log("inserted successfully");
    res.end();
});
app.post("/registerDonee", (req, res) => {
    db.collection("donee").insertOne({
        _id:req.body.phone,
        name:req.body.firstName,
        phone:req.body.phone,
        email:req.body.email
    });
    console.log("inserted successfully");
    res.end();
});
app.listen("2000",()=>{
    console.log("server started");
});