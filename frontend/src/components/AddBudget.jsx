import React, { useState, useContext } from 'react';
import './AddBudget.css';
import { AuthContext } from '../context/AuthContext';

export function AddBudget({ onAdd }) {
    const { user, token } = useContext(AuthContext); // get user and jwt
    const [form, setForm] = useState({ amount: "", category: "", description: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        const trimmedCategory = form.category.trim();
        const trimmedDescription = form.description.trim();
        const amount = parseFloat(form.amount);
        
        if (!form.amount || !trimmedCategory || !trimmedDescription) {
            setError("Please fill in all fields.");
            return;
        }
        
        if (Number.isNaN(amount) || amount <= 0) {
            setError("Please enter a valid positive amount.");
            return;
        }
        
        setError("");

        const userId = 1; // hardcoded for now until login/auth

    const body = {
        category: trimmedCategory,
        amount: amount,
        description: trimmedDescription,
        userId
    };

    try {
        const response = await fetch(`http://localhost:8080/api/budgets`, {
            method: "POST",
            headers: 
            { 
                "Content-Type": "application/json" ,
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) throw new Error("Failed to add budget");

            const savedBudget = await response.json();

        // Update local UI
        onAdd(savedBudget);

        setForm({ amount: "", category: "", description: "" });

    } catch (err) {
        console.error(err);
        setError("Could not add budget. Check backend.");
    }
};
    

    return (
        <div className="add-budget-container">
            <h2>Add Budget</h2>
            <form onSubmit={handleAdd} className="add-budget-form">
                {error && <div className="error-message">{error}</div>}

                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={handleChange}
                    className="form-input"
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                    className="form-input"
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    className="form-input"
                />
                <button type="submit" className="submit-button">
                    Add Item
                </button>
            </form>
        </div>
    );
}