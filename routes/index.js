const staffRouter = require("./staff")

module.exports = (app) => {
    app.use("/api/staff", staffRouter)
}