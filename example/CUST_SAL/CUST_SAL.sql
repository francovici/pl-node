CREATE PACKAGE cust_sal AS 
   PROCEDURE find_sal(c_id customers.id%type); 
END cust_sal; 