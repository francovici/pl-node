CREATE PACKAGE emp_bonus AS
   PROCEDURE calc_bonus (date_hired employees.hire_date%TYPE);
END emp_bonus;
/
CREATE PACKAGE BODY emp_bonus AS
   PROCEDURE calc_bonus (date_hired employees.hire_date%TYPE) IS
   BEGIN
     DBMS_OUTPUT.PUT_LINE('Employees hired on ' || date_hired || ' get bonus.');
   END;
END emp_bonus;
/