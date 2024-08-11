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


//add bills

export const addAttribute = (floorIndex, labels, bills, isEditingLabel, setLabel, setBills, setEditLabel) => {
  console.log(floorIndex)
  const newLabelKey = `label${Object.keys(labels[floorIndex]).length + 1}`;
  const newBillKey = `bill${Object.keys(bills[floorIndex]).length }`; 


  const newLabels = labels.map((label, i) => {
    console.log('Index:', i);
    return i === floorIndex ? { ...label, [newLabelKey]: 'New Bill' } : label;
  });
  
  const newBills = bills.map((bill, i) =>
    i === floorIndex ? { ...bill, [newBillKey]: 0 } : bill
  );

  const newEditLabels = isEditingLabel.map((editLabel, i) =>
    i === floorIndex ? { ...editLabel, [newLabelKey]: false } : editLabel
  );

  setLabel(newLabels);
  setBills(newBills);
  setEditLabel(newEditLabels);
};

//delete bill

export const deleteAttribute = (floorIndex, billKey, labelKey, labels, bills, isEditingLabel, setLabel, setBills, setEditLabel) => {

  const newBills = bills.map((bill, i) => {
    if (i === floorIndex) {
      const { [billKey]: _, ...rest } = bill;
      return rest;
    }
    return bill;
  });


  // Remove specific label
  const newLabels = labels.map((label, i) => {
    if (i === floorIndex) {
      const { [labelKey]: _, ...rest } = label;
      return rest;
    }
    return label;
  });


  //Remove specific editing state
  const newEditLabels = isEditingLabel.map((editLabel, i) => {
    if (i === floorIndex) {
      const { [labelKey]: _, ...rest } = editLabel;
      return rest;
    }
    return editLabel;
  });

  setBills(newBills);
  setLabel(newLabels);
  setEditLabel(newEditLabels);
};
