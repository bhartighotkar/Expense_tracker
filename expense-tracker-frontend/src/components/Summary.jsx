
function Summary({ expenses }) {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  return (
    <div className="card m-3 p-3 shadow-sm">
      <h4 className="text-success">Summary</h4>
      <p><strong>Total Spent:</strong> ₹{total.toFixed(2)}</p>
      <ul className="list-group">
        {Object.entries(categoryTotals).map(([category, amount]) => (
          <li key={category} className="list-group-item d-flex justify-content-between align-items-center">
            {category}
            <span className="badge bg-primary rounded-pill">₹{amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Summary;