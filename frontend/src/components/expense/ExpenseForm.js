// Import React Hook
import { useState, useEffect } from 'react';

// Parent Class Props:
// - initialData: Expense Object to Update (Null for Add)
// - onSubmit:    function(expenseData) -> Parent handles Add or Update
// - onCancelEdit: function() -> Exit edit mode, return to "Add" mode

// Child - ExpenseForm Component Function
export default function ExpenseForm({ initialData, onSubmit, onCancelEdit }) {
  // "Expense" Object Variables + Define Form / SetForm
  const [form, setForm] = useState({
    id: undefined,
    amount: '',
    category: '',
    description: '',
    expenseDate: '',
  });

  // Error Catching / Boolean Variables
  // Errors: An object holding field-specific validation messages
  const [errors, setErrors] = useState({});

  // ServerError: Message shown when the backend fails (network, validation, etc.)
  const [serverError, setServerError] = useState('');
  
  // Update / Add Boolean: Are we editing existing expense or adding new?
  const isEditMode = Boolean(form.id);


  useEffect(() => {
    // If initialData Exists -> Update Expense
    if (initialData) {
      setForm({
        id: initialData.id,
        amount: initialData.amount != null ? String(initialData.amount) : '',
        category: initialData.category || '',
        description: initialData.description || '',
        expenseDate: initialData.expenseDate ? String(initialData.expenseDate).slice(0, 10) : '',
      });
      setErrors({});
      setServerError('');
    }
    // If No initialData -> Add Expense
    else {
      setForm({
        id: undefined,
        amount: '',
        category: '',
        description: '',
        expenseDate: '',
      });
      setErrors({});
      setServerError('');
    }
    // [initialData] Tells React when to re-run the code inside useEffect. If changes, run again.
  }, [initialData]);


  // Function - Validate Form Completion
  function validate(f) {
    const e = {};
    if (!f.amount || Number.isNaN(Number(f.amount)) || Number(f.amount) <= 0) {
      e.amount = 'Enter a valid amount > 0';
    }
    if (!f.category.trim()) {
      e.category = 'Category is required';
    }
    if (!f.expenseDate) {
      e.expenseDate = 'Date is required';
    }
    return e;
  }

  // Function - Changes to Expense Form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear Errors for Fields
    if (errors[name]) setErrors((prev) => {
      const { [name]: _, ...rest } = prev;
      return rest;
    });
  };

  // Function - Submit Add / Update Expense
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear Old Errors
    setServerError('');

    //1. Invoke Validation
    const v = validate(form);
    setErrors(v);

    // If Invalid - Stop
    if (Object.keys(v).length) return;

    try {
      //2. Create New Expense Object from Fields
      const expenseData = {
        id: form.id, // Undefined for Add, Defined for Edit
        amount: Number(form.amount),
        category: form.category.trim(),
        description: form.description.trim(),
        expenseDate: form.expenseDate,
      };

      //3. Send to Parent(Expense.js)
      await onSubmit(expenseData);

      //4. After Completion... 
      // If Edit Mode, Exit After Save
      if (isEditMode) {
        if (onCancelEdit) {
          onCancelEdit();
        }
      }
      // If Add Mode, Reset Form        
      else {
        setForm({
          id: undefined,
          amount: '',
          category: '',
          description: '',
          expenseDate: '',
        });
        setErrors({});
      }
    } catch (err) {
      setServerError(err.message || 'Failed to save expense.');
    } 
  };

  // Expense Form Display + Save Expense Button
  return (
    <div className="expense-form">
      {/* Change heading based on mode */}
      <h2>{isEditMode ? 'Edit Expense' : 'Add Expense'}</h2>

      {/* Show top-level server error (e.g., network failure) */}
      {serverError && <div className="error">{serverError}</div>}

      {/* Expense Form + Invoke Submission*/}
      <form className="expense-form" onSubmit={handleSubmit}>
        {/* Expense Amount Field */}
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="text"
            id="amount"
            step="0.01"
            name="amount"
            value={form.amount}
            onChange={handleChange}
          />
        </div>
        {/* Inline Field Validation Message */}
        {errors.amount && <p className="error">{errors.amount}</p>}

        {/* Expense Category Field */}
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </div>
        {/* Inline Field Validation Message */}
        {errors.category && <p className="error">{errors.category}</p>}

        {/* Expense Description Field */}
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        {/* Expense Date Field */}
        <div className="form-group">
          <label htmlFor="expenseDate">Transaction Date:</label>
          <input
            type="date"
            id="expenseDate"
            name="expenseDate"
            value={form.expenseDate}
            onChange={handleChange}
          />
        </div>
        {/* Inline Field Validation Message */}
        {errors.expenseDate && <p className="error">{errors.expenseDate}</p>}

        <div className="form-actions">
          <button 
          type="submit"
          >
            {isEditMode ? 'Update Expense' : 'Add Expense'}
          </button>

          {/* Show Cancel Only When Edit Mode*/}
          {isEditMode && onCancelEdit && (
            <button
              type="button"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}