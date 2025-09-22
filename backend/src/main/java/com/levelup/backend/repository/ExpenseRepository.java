package com.levelup.backend.repository;

import com.levelup.backend.model.Expense;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository  extends JpaRepository<Expense, Long> {

}