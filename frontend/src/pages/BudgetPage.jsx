import React, { useEffect, useState, useContext } from "react";
import { BudgetTable } from "../components/BudgetTable";
import { AddBudget } from "../components/AddBudget";
import { AuthContext } from "../context/AuthContext";

export default function BudgetPage() {
    const { user, token } = useContext(AuthContext); // get user info and jwt
    const [budgets, setBudgets] = useState([]);
    

    // Fetch budgets
    useEffect(() => {
    if (user && token) {
        const fetchBudgets = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/budgets?userId=${user.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setBudgets(data);
            } catch (err) {
                console.error("Error fetching budgets:", err);
            }
        };

        fetchBudgets();
    }
    }, [user, token]);
    

    const handleAddBudget = async (newBudget) => {
        try {
            const response = await fetch(`http://localhost:8080/api/budgets`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ ...newBudget, userId: user.id })
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const savedBudget = await response.json();
            setBudgets(prev => [...prev, savedBudget]);
        } catch (err) {
            console.error("Error adding budget:", err);
        }
    };

    const handleEditBudget = async (id, updatedBudget) => {
        try {
            const response = await fetch(`http://localhost:8080/api/budgets/${id}`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedBudget)
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const updated = await response.json();

            setBudgets((prev) => prev.map(b => b.id === id ? updated : b));
        } catch (err) {
            console.error("Error updating budget:", err);
        }
    };

    const handleDeleteBudget = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/budgets/${id}`,
                 {
                     method: "DELETE",
                     headers: {
                    Authorization: `Bearer ${token}`
                    }
                    });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            setBudgets((prev) => prev.filter(b => b.id !== id));
        } catch (err) {
            console.error("Error deleting budget:", err);
        }
    };

    return (
        <div>
            
            <AddBudget onAdd={handleAddBudget} />
            <BudgetTable items={budgets} onEdit={handleEditBudget} onDelete={handleDeleteBudget} />
        </div>
    );
}
