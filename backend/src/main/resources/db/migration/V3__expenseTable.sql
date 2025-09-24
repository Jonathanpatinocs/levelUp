DROP TABLE IF EXISTS expense;

CREATE TABLE expense (
                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         amount DOUBLE NOT NULL,
                         category VARCHAR(100) NOT NULL,
                         description VARCHAR(255),
                         expense_date DATE,
                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);