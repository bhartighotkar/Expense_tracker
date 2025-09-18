import axios from '../api/axios';

function ExpenseList({ expenses, onDelete }) {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/expenses/${id}`);
      onDelete(id); // Update local state
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  return (
    <div className="card m-3 p-3 shadow-sm">
      <h4 className="text-danger">Expense List</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount (₹)</th>
            <th>Category</th>
            <th>Date</th>
            <th>Action</th> {/* ✅ New column */}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.title}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
              <td>{expense.date}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(expense._id)}
                >
                  <i className="bi bi-trash"></i> {/* Bootstrap trash icon */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;