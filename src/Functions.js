import React, { useState } from 'react';


export const handleChange = (index, field, value, bills, setBills, isEditingBill, setEditBill) => {
    const updatedBills = bills.map((bill, i) =>
      i === index ? { ...bill, [field]: parseFloat(value) || 0 } : bill
    );
    setBills(updatedBills);
    setEditBill(isEditingBill? false : true)
  };

 export const handleLabelChange = (index) => {

  }

  export const toggleEdit = (index, label, isEditingLabel, setEditLabel) => {
    
setEditLabel(isEditingLabel ? false : true)
  }

  export const calculateTotal = (index, bills, setBills) => {
    const updatedBills = bills.map((bill, i) => {
      if (i === index) {
        const totalAmount = bill.bill1 + bill.bill2 + bill.bill3;
        return { ...bill, total: totalAmount };
      }
      return bill;
    });
    setBills(updatedBills);
  };

