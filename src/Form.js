import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import './CSS/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSave, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { handleChange, handleFocus, handleLabelChange, toggleEdit } from './Functions.js';

function BillCalculator() {

  const [floorNo, setFloor] = useState(["Floor 1", "Floor 2", "Floor 3", "Floor 4"])

  const [bills, setBills] = useState([
    { bill1: 0, bill2: 0, bill3: 0, total: 0 },
    { bill1: 0, bill2: 0, bill3: 0, total: 0 },
    { bill1: 0, bill2: 0, bill3: 0, total: 0 },
    { bill1: 0, bill2: 0, bill3: 0, total: 0 },
  ]);

  const [labels, setLabel] = useState([
    { label1: 'Water Bill', label2: 'Gas Bill', label3: 'Electricity Bill' },
    { label1: 'Water Bill', label2: 'Gas Bill', label3: 'Electricity Bill' },
    { label1: 'Water Bill', label2: 'Gas Bill', label3: 'Electricity Bill' },
    { label1: 'Water Bill', label2: 'Gas Bill', label3: 'Electricity Bill' },
  ]);

 
  const [isEditingLabel, setEditLabel] = useState(
    Array(labels.length).fill({ label1: false, label2: false, label3: false })
  );

  const [backupLabels, setBackupLabels] = useState(labels);

  const addAttribute = (floorIndex) => {
    console.log(floorIndex)
    const newLabelKey = `label${Object.keys(labels[floorIndex]).length + 1}`;
    const newBillKey = `bill${Object.keys(bills[floorIndex]).length }`; // Adjust key naming to follow the pattern



    const newLabels = labels.map((label, i) => {
      console.log('Index:', i); // Add this line to log the value of `i`
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


  const exportPDF = () => {
    const doc = new jsPDF();

    bills.forEach((bill, i) => {
      const x = (i % 2) * 100 + 20;
      const y = Math.floor(i / 2) * 60 + 10;

      doc.text(`Floor ${i + 1}`, x, y);
      doc.text(`${labels[i].label1}: ${bill.bill1}`, x, y + 10);
      doc.text(`${labels[i].label2}: ${bill.bill2}`, x, y + 20);
      doc.text(`${labels[i].label3}: ${bill.bill3}`, x, y + 30);
      doc.text(`Total: ${bill.total}`, x, y + 40);
    });

    doc.save('bill-summary.pdf');
  };

  const startEditing = (index, labelField) => {
    setBackupLabels([...labels]);
    toggleEdit(index, labelField, isEditingLabel, setEditLabel);
  };

  const cancelEditing = (index, labelField) => {
    setLabel(backupLabels);
    toggleEdit(index, labelField, isEditingLabel, setEditLabel);
  };

  const renderInput = (index, billField, labelField) => (
    <div className='fields'>
      <div className='edit-button'>
        <button className='edit' type="button">
          <FontAwesomeIcon icon={isEditingLabel[index][labelField] ? faSave : faPen} onClick={() => startEditing(index, labelField)} />
        </button>
      </div>
      {isEditingLabel[index][labelField] ? (
        <>
          <input
            type='text'
            value={labels[index][labelField]}
            onChange={(e) => handleLabelChange(index, labelField, e.target.value, labels, setLabel)}
          />
          <button className='cancel' type='button' onClick={() => cancelEditing(index, labelField)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </>
      ) : (
        <label>
          <div className='label-name'>{labels[index][labelField]}</div>:
          <input
            type="number"
            value={bills[index][billField]}
            onFocus={handleFocus}
            onChange={(e) => handleChange(index, billField, e.target.value, bills, setBills)}
          />
        </label>
      )}
      <br /><br />
    </div>
  );

  return (
    <div>
      <h2>Bill Calculator</h2>
      <div className='grid-container'>
        {bills.map((bill, index) => (
          <div key={index}>
            <h3><input defaultValue={"Floor {index + 1}"}></input></h3>
            <form>
              <div className='labelsNames'>
                {Object.keys(bill).filter(key => key !== 'total').map((key, idx) => (
                  renderInput(index, key, `label${idx + 1}`)
                ))}
              </div>
              <button type="button" className='add' onClick={() => addAttribute(index)}>
                <FontAwesomeIcon icon={faPlus} /> Add Attribute
              </button>
            </form>
            <p>Total: {bill.total}</p>
          </div>
        ))}
      </div>
      <button onClick={exportPDF}>Export as PDF</button>
    </div>
  );
}

export default BillCalculator;
