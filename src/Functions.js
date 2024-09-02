

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

const calculateTotal = (index, bills, setBills) => {
  const updatedBills = bills.map((bill, i) => {
    if (i === index) {
      const totalAmount = Object.keys(bill)
      .filter(key => key !== 'total') // Exclude the 'total' field
      .reduce((sum, key) => sum + bill[key], 0); // Sum up all the bill fields

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

//Adding a callback parameter allows you to execute a function after the state has been updated

// export const handleDeleteClick = (index, billField, labelField, labels, bills, isEditingLabel, setLabel, setBills, setEditLabel) => {
//   deleteAttribute(index, billField, labelField, labels, bills, isEditingLabel, setLabel, setBills, setEditLabel);
// }


export const handleDeleteClick = (index, billField, labelField, labels, bills, isEditingLabel, setLabel, setBills, setEditLabel) => {
  deleteAttribute(index, billField, labelField, labels, bills, isEditingLabel, setLabel, setBills, setEditLabel, (updatedBills) => {
    calculateTotal(index, updatedBills, setBills);
  });
};


//delete bill

const deleteAttribute = (floorIndex, billKey, labelKey, labels, bills, isEditingLabel, setLabel, setBills, setEditLabel, callback) => {

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

  if (callback) callback(newBills);
};




export const startEditingFloor = (index,setEditingFloorIndex, setCurrentFloorName, floorNo) => {
  setEditingFloorIndex(index);
  setCurrentFloorName(floorNo[index]);
};

export const saveFloorName = (index, setFloor, setEditingFloorIndex, setCurrentFloorName, currentFloorName, floorNo) => {
  const newFloorNo = [...floorNo];
  newFloorNo[index] = currentFloorName;
  setFloor(newFloorNo);
  setEditingFloorIndex(null);
  setCurrentFloorName('');
};

export const cancelEditingFloor = (setEditingFloorIndex,setCurrentFloorName) => {
  setEditingFloorIndex(null);
  setCurrentFloorName('');
};
