const express = require("express")
const fs = require("fs").promises

const app = express()
app.use(express.static(__dirname));
app.get("/", async (request, response) => {
    response.send(await fs.readFile("./index.html", "utf8")) 
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log("Synapse Starting at http://localhost:" + port)
})
