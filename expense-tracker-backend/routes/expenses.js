// const express = require('express');
// const router = express.Router();
// const Expense = require('../models/Expense');

// // GET all expenses
// router.get('/', async (req, res) => {
//   const expenses = await Expense.find();
//   res.json(expenses);
// });

// // POST new expense
// router.post('/', async (req, res) => {
//   const newExpense = new Expense(req.body);
//   await newExpense.save();
//   res.status(201).json(newExpense);
// });

// module.exports = router;


// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const expenseRoutes = require('./routes/expenses');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// mongoose.connect('your_mongodb_connection_string', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/api/expenses', expenseRoutes);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });





const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// POST: Add expense
router.post('/', async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    console.error('Error saving expense:', err.message);
    res.status(500).json({ error: 'Failed to save expense' });
  }
});

// GET: Fetch all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (err) {
    console.error('Error fetching expenses:', err.message);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// DELETE: Remove expense
router.delete('/:id', async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deletedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.status(200).json({ message: 'Expense deleted' });
  } catch (err) {
    console.error('Error deleting expense:', err.message);
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

module.exports = router;
