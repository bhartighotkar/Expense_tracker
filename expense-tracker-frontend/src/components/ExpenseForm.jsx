import { useState } from 'react';
import axios from '../api/axios';

const ExpenseForm = ({ onAddExpense }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  const newExpense = {
    title,
    amount: parseFloat(amount),
    category,
    date,
  };

  try {
    await axios.post('/expenses', newExpense);
    // ❌ Remove onAddExpense(newExpense)
    // ✅ Let App.jsx re-fetch the list
  } catch (err) {
    console.error('Error adding expense:', err);
  }

  setTitle('');
  setAmount('');
  setCategory('');
  setDate('');
};


  return (
    <div className="card m-3 p-3 shadow-sm">
      <h4 className="text-primary">Add New Expense</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input type="text" className="form-control" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-2">
          <input type="number" className="form-control" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>
        <div className="mb-2">
          <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-2">
          <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-success w-100">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
