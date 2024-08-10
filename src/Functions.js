import React, { useState } from 'react';


export const handleChange = (index, field, value, bills, setBills) => {
  const updatedBills = bills.map((bill, i) =>
    i === index ? { ...bill, [field]: parseFloat(value) || 0 } : bill
  );
  setBills(updatedBills);
  calculateTotal(index, updatedBills, setBills);
};

export const handleFocus = (e) => {
  if (e.target.value === '0') {
    e.target.value = '';
  }
};

export const handleLabelChange = (index, field, value, labels, setLabel) => {
  const updateLabels = labels.map((label, i) =>
    i === index ? { ...label, [field]: value } : label);

  setLabel(updateLabels);
}

export const toggleEdit = (index, field, isEditingLabel, setEditLabel) => {
  const updateEdit = isEditingLabel.map((edit,i)=>
    i=== index? {...edit, [field] : !edit[field]} : edit
  );

  setEditLabel(updateEdit)
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

