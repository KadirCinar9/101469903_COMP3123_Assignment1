const express = require('express');
const Employee = require('../models/Employee'); // Make sure you create this model
const router = express.Router();

// Get all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new employee
router.post('/employees', async (req, res) => {
  const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;
  const employee = new Employee({ first_name, last_name, email, position, salary, date_of_joining, department });

  try {
    await employee.save();
    res.status(201).json({
      message: 'Employee created successfully.',
      employee_id: employee._id,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get employee by ID
router.get('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found.' });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update employee by ID
router.put('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) return res.status(404).json({ message: 'Employee not found.' });
    res.json({ message: 'Employee details updated successfully.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete employee by ID
router.delete('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found.' });
    res.json({ message: 'Employee deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
