const e = require("express");
const Employee = require("../models/employee");

const updatedStaff =(staffs) => {
  for (let i of staffs) {
    i['sn'] = i
  }
}
const addStaff = async (req, res) => {
  try {
    const { lastName, firstName, email, position, department } = req.body;
    await Employee.findOne({ email: email })
      // .then(emp => {
      .exec(async (err, emp) => {
        if (err) {
          res.status(400).json({ error: `unable to check existed staffs` });
          return;
        }
        if (emp) {
          res.status(409).send({ error: `staff with email already exists!` });
          return;
        }
        const newStaff = new Employee({
          lastName: lastName,
          firstName: firstName,
          email: email,
          position: position,
          department: department,
        });
        await newStaff
          .save()
          .then(() => {
            res.status(201).send(`Staff Added`);
            return;
          })
          .catch((err) => {
            res.status(400).json({ error: `staff not added ${err}` });
            return;
          });
      });
  } catch (error) {
    res.status(400).json({ erorr: `Unable to add staff ${error}` });
    return;
  }
};

const allStaff = async (req, res) => {
  try {
    await Employee.find()
      .then((staffs) => {
        // updatedStaff(staffs)
      //  const updatedStaff = [...staffs, {'': "0"}]
        
        return res.status(201).json({ staffs });
      })
      .catch((err) => {
        return res.status(400).json({ error: `Error getting staffs ${err}` });
      });
  } catch (error) {
    res.status(400).json({ erorr: `Unable to get staff ${error}` });
    return;
  }
};

const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { lastName, firstName, email, position, department } = req.body;
    let data = { lastName, firstName, email, position, department };
    await Employee.findOne({ _id: id, email }).exec(async (err, emp) => {
      if (err) {
        res.status(400).json({ error: `can't check all staffs ${err}` });
        return;
      }
      if (!emp) {
        res.status(404).json({ error: `staff with email does not exist!` });
        return;
      }
      if (emp) {
        await Employee.findOneAndUpdate({ _id: id }, data, { new: true })
          .then((updatedStaff) => {
            res.status(202).json({ updatedStaff });
          })
          .catch((err) => {
            return res
              .status(400)
              .json({ error: `Error updating staff ${err}` });
          });
      }
    });
  } catch (error) {
    res.status(400).json({ erorr: `Unable to update staff ${error}` });
    return;
  }
};

const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.findOne({ _id: id }).exec(async (err, emp) => {
      if (err) {
        res.status(400).json({ error: `can't check all staffs ${err}` });
        return;
      }
      if (!emp) {
        res.status(404).json({ error: `staff does not exist!` });
        return;
      }
      if (emp) {
        await Employee.findOneAndDelete({ _id: id })
          .then(() => {
            res.status(200).send(`staff deleted`);
            return;
          })
          .catch((err) => {
            res.status(400).json({ error: `error deleting staff` });
            return;
          });
      }
    });
  } catch (error) {
    res.status(400).json({ erorr: `Unable to delete staff ${error}` });
    return;
  }
};

module.exports = {
  addStaff,
  allStaff,
  updateStaff,
  deleteStaff,
};
