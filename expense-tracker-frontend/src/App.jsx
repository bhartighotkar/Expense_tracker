// import { useEffect, useState } from 'react';
// import axios from './api/axios';
// import Chart from './components/Chart';
// import ExpenseForm from './components/ExpenseForm';
// import ExpenseList from './components/ExpenseList';
// import Navbar from './components/Navbar';
// import Summary from './components/Summary';

// function App() {
//   const [expenses, setExpenses] = useState([]);

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const res = await axios.get('/expenses');
//         setExpenses(res.data);
//       } catch (err) {
//         console.error('Error fetching expenses:', err);
//       }
//     };

//     fetchExpenses();
//   }, []);

// const handleAddExpense = async (expense) => {
//   try {
//     await axios.post('/expenses', expense);
//     const res = await axios.get('/expenses'); // ✅ Re-fetch updated list
//     setExpenses(res.data);
//   } catch (err) {
//     console.error('Error updating expenses:', err);
//   }
// };
//   return (
//     <div style={{ backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
//       <Navbar />

//       <div className="text-center mt-4 mb-3">
//         <h2 className="text-primary fw-bold">
//           <i className="bi bi-wallet2 me-2"></i>Track Your Expenses Smartly
//         </h2>
//         <p className="text-muted">Add, view, and analyze your spending in one place.</p>
//       </div>

//       <div className="container">
//         <div className="row">
//           <div className="col-md-6">
//             <ExpenseForm onAddExpense={handleAddExpense} />
//           </div>
//           <div className="col-md-6">
//             <Summary expenses={expenses} />
//             <Chart expenses={expenses} />
//           </div>
//         </div>

//         <ExpenseList expenses={expenses} />
//       </div>

//       <footer className="text-center text-muted mt-5 mb-3">
//         <small>
//           Made with ❤️ by YourName | <i className="bi bi-github"></i> <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a> | <i className="bi bi-envelope"></i> your@email.com
//         </small>
//       </footer>
//     </div>
//   );
// }

// export default App;



import { useEffect, useState } from 'react';
import axios from './api/axios';
import Chart from './components/Chart';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Navbar from './components/Navbar';
import Summary from './components/Summary';

// ✅ Toastify imports for success/error messages
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [expenses, setExpenses] = useState([]);

  // ✅ Sample data to show if DB is empty or fails
  const sampleExpenses = [
    { title: 'Pizza', amount: 250, category: 'Food', date: '2025-09-15' },
    { title: 'Uber Ride', amount: 400, category: 'Travel', date: '2025-09-14' },
    { title: 'T-shirt', amount: 700, category: 'Shopping', date: '2025-09-13' },
    { title: 'Books', amount: 300, category: 'Education', date: '2025-09-12' },
    { title: 'Medicines', amount: 800, category: 'Health', date: '2025-09-12' },
  ];

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('/expenses');
      if (res.data.length === 0) {
        setExpenses(sampleExpenses); // ✅ Use sample data if DB is empty
      } else {
        setExpenses(res.data); // ✅ Use real data
      }
    } catch (err) {
      console.error('Error fetching expenses:', err);
      setExpenses(sampleExpenses); // ✅ Fallback to sample data on error
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddExpense = async (expense) => {
  try {
    await axios.post('/expenses', expense);
    await fetchExpenses();
    toast.success('Expense added successfully!');
  } catch (err) {
    console.error('Error adding expense:', err);
    toast.error('Failed to add expense');
  }
};

 const handleDeleteExpense = async (id) => {
  try {
    await axios.delete(`/expenses/${id}`);
    await fetchExpenses();
    toast.success('Expense deleted successfully!');
  } catch (err) {
    console.error('Error deleting expense:', err);
    toast.error('Failed to delete expense');
  }
};

  return (
    <div style={{ backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      <Navbar />

      <div className="text-center mt-4 mb-3">
        <h2 className="text-primary fw-bold">
          <i className="bi bi-wallet2 me-2"></i>Track Your Expenses Smartly
        </h2>
        <p className="text-muted">Add, view, and analyze your spending in one place.</p>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <ExpenseForm onAddExpense={handleAddExpense} />
          </div>
          <div className="col-md-6">
            <Summary expenses={expenses} />
            <Chart expenses={expenses} />
          </div>
        </div>

        <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>

      <footer className="text-center text-muted mt-5 mb-3">
        <small>
          Made with ❤️ by YourName | <i className="bi bi-github"></i>{' '}
          <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a> |{' '}
          <i className="bi bi-envelope"></i> your@email.com
        </small>
      </footer>
    </div>
  );
}

export default App;
