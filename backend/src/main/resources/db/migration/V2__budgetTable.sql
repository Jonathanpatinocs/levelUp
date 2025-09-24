DROP TABLE IF EXISTS budget;
CREATE TABLE budget (
                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         category VARCHAR(100) NOT NULL,
                         monthly_limit DOUBLE NOT NULL,
                         start_date DATE,
                         end_date DATE,
                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);