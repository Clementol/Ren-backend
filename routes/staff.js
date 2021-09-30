const { Router } = require("express");
const { addStaff, updateStaff, allStaff, deleteStaff } = require("../controllers/staff");
const { staffValidation, isRequestValidated } = require("../validators");

const staffRouter = Router();

staffRouter.post("/add", staffValidation, isRequestValidated, addStaff);
staffRouter.put("/update/:id", staffValidation, isRequestValidated, updateStaff);
staffRouter.delete("/delete/:id", deleteStaff);
staffRouter.get("/all", allStaff);

module.exports = staffRouter;
