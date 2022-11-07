/* CREATE TABLE system.customers (
    ID NUMBER,
    NAME VARCHAR2(50),
    AGE NUMBER,
    ADDRESS VARCHAR2(100),
    SALARY DOUBLE PRECISION
);
 */

INSERT INTO system.customers VALUES 
(1,'Ramesh',32,'Ahmedabad',3000.00);
INSERT INTO system.customers VALUES 
(2,'Khilan',32,'Delhi',3000.00);
INSERT INTO system.customers VALUES 
(3,'kaushik',32,'Kota',3000.00);
INSERT INTO system.customers VALUES 
(4,'Chaitali',32,'Mumbai',7500.00);
INSERT INTO system.customers VALUES 
(5,'Hardik',32,'Bhopal',9500.00);
INSERT INTO system.customers VALUES 
(6,'Komal',32,'MP',5500.00);
COMMIT;

SELECT * FROM system.customers;