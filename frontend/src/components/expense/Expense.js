// React Imports 
// useState returns an array with TWO things: variable and setter w/ initial state.
// useEffect used for occasional clean-up / changes when requeted.
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '/Users/johnypatino/levelUp/frontend/src/context/AuthContext.js'
// Imported Components
import ExpenseClient from './ExpenseClient';
import ExpenseForm from './ExpenseForm';
import ExpenseDetails from './ExpenseDetails';

// Import css Files
import './ExpenseDetails.css';
import './ExpenseForm.css';
import './Expense.css';

// Parent Expense Container Component
// - Owns the list of expenses
// - Owns which expense is currently selected for editing
// - Passes data + callbacks to children
export default function Expense() {
  const { user, token } = useContext(AuthContext); // get user and jwt

  // State for List Display
  const [expenses, setExpenses] = useState([]);

  // The Expense Currently Being Edited (null means "add mode")
  const [selectedExpense, setSelectedExpense] = useState(null);

  // Auto-Load Expenses on Mount
  useEffect(() => {
    if (!user || !token) return;

    const fetchExpenses = async () => {
      try {
        const data = await ExpenseClient.getExpenses(user.id, token);
        setExpenses(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load expenses:", err);
        setExpenses([]);
      }
    };

    fetchExpenses();
  }, [user, token]);

  // Refresh Handler After Successful ADD or UPDATE 
  // The form will call this with a `expenseData` object that may or may not have an `id`.
  // - If `expenseData.id` exists  -> UPDATE (PUT)
  // - If `expenseData.id` is empty -> CREATE (POST)
  const handleSubmitExpense = async (expenseData) => {

    try {
      //If ID Provided, Update Expense
      if (expenseData.id) {

        const updated = await ExpenseClient.updateExpense(expenseData.id, expenseData);

        // Refresh List to Display Updated Expenses
        setExpenses((prev) =>
          prev.map((e) => (e.id === updated.id ? updated : e))
        );

        // Exit Edit Mode
        setSelectedExpense(null);

        return updated;

        // If ID NOT Provided, Add Expense
      } else {

        const created = await ExpenseClient.addExpense(expenseData, user, token);

        // Refresh List to Display Added Expense
        setExpenses((prev) => [created, ...prev]);

        return created;
      }

    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  // Function - Cancel Edit Mode (clear form)
  const handleCancelEdit = () => {
    setSelectedExpense(null);
  };

  // Function - Delete Expense
  const handleDeleteExpense = async (id) => {
    if (!token) return;
    try {
      await ExpenseClient.deleteExpense(id, token);

      // Refresh List w/out Expense
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Failed to delete expense:", err);
    }

  };
  // Function - Edit Requested (add selected expense to form)
  const handleUpdateExpense = (expense) => {
    setSelectedExpense(expense);
  };

  // Parent Expense Display
  return (
    <div className="expenses-page">
      {/* "Page Title: Expense" Header */}
      <h1>Expenses</h1>
      <section className="split-view">
        <div className="pane left">
          {/* "Expense Details" Child */}
          <ExpenseDetails 
          expenses={expenses} 
          onUpdate={handleUpdateExpense} 
          onDelete={handleDeleteExpense} />
        </div>
        <div className="pane right">
          {/* "Add/Update Expense Form" Child */}
          <ExpenseForm 
          initialData={selectedExpense} 
          onSubmit={handleSubmitExpense} 
          onCancelEdit={handleCancelEdit} />
        </div>
      </section>
    </div>
  );
}
