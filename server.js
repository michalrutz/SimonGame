const express = require("express");
const path = require("path");
const app = express();
 
// app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname+"/public")))

app.get("/", function(req, res) {
	res.sendFile(__dirname+"/index.html");
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log("server is running");
});