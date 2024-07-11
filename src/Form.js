import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import './CSS/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { handleChange, handleLabelChange, toggleEdit } from './Functions.js'

function BillCalculator() {
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

  const [isEditingBill, setEditBill] = useState(
    Array(bills.length).fill({ bill1: false, bill2: false, bill3: false })
  );

  const [isEditingLabel, setEditLabel] = useState(
    Array(labels.length).fill({ label1: false, label2: false, label3: false })
  );

  const [backupLabels, setBackupLabels] = useState(labels);


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
    <>
      <button className='edit' type="button">
        <FontAwesomeIcon icon={isEditingLabel[index][labelField] ? faSave : faPen} onClick={() => startEditing(index, labelField)} />
      </button>
      {isEditingLabel[index][labelField] ? (
        <><input
          type='text'
          value={labels[index][labelField]}
          onChange={(e) => handleLabelChange(index, labelField, e.target.value, labels, setLabel)} />

          <button className='cancel' type='button' onClick={() => cancelEditing(index, labelField)}><FontAwesomeIcon icon={faTimes} /></button>

        </>
      ) : (
        <label>
          {labels[index][labelField]}:
          <input
            type="number"
            value={bills[index][billField]}
            onChange={(e) => handleChange(index, billField, e.target.value, bills, setBills)}
          />
        </label>
      )}
      <br /><br />
    </>
  );

  return (
    <div>
      <h2>Bill Calculator</h2>
      <div className='grid-container'>
        {bills.map((bill, index) => (
          <div key={index}>
            <h3>Floor {index + 1}</h3>
            <form>
              {renderInput(index, 'bill1', 'label1')}
              {renderInput(index, 'bill2', 'label2')}
              {renderInput(index, 'bill3', 'label3')}



              {/* <button type="button" onClick={() => calculateTotal(index, bills, setBills)}>Calculate Total</button> */}
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
