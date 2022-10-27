import express from "express"

let configViewEngine = (app) => {
    // arrow func
    app.use(express.static("./src/public"))
    app.set("view engine", "ejs")
    app.set("views", "./src/views") //config duong dan cho view roi nen render ko can link
}

// eexport vi dung let chi khai bao trg file nay muon dung trg file khai can export
module.exports = configViewEngine;