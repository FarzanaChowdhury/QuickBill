import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import './CSS/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { handleChange, handleLabelChange, toggleEdit, calculateTotal } from './Functions.js'

function BillCalculator() {
  const [bills, setBills] = useState([
    { bill1: 0, bill2: 0, bill3: 0, total: 0 },
    { bill1: 0, bill2: 0, bill3: 0, total: 0 },
    { bill1: 0, bill2: 0, bill3: 0, total: 0 },
    { bill1: 0, bill2: 0, bill3: 0, total: 0 },
  ]);

  const [labels, setLabel] = useState(

    [{ label1: 'Water Bill', label2: 'Gas Bill', label3: 'Electricity Bill' },
    { label1: 'Water Bill', label2: 'Gas Bill', label3: 'Electricity Bill' },
    { label1: 'Water Bill', label2: 'Gas Bill', label3: 'Electricity Bill' },
    { label1: 'Water Bill', label2: 'Gas Bill', label3: 'Electricity Bill' },
    ]
  )

  const [isEditingBill, setEditBill] = useState(
          Array(bills.length).fill({ bill: false, bill2: false, bill3: false })
    
  );


  const [isEditingLabel, setEditLabel] = useState(
    Array(labels.length).fill({ label1: false, label2: false, label3: false })
  );

  const exportPDF = () => {
    const doc = new jsPDF();

    bills.forEach((bill, i) => {
      // Determine the column and row positions
      const x = (i % 2) * 100 + 20; // 100 points between columns, 10 points margin
      const y = Math.floor(i / 2) * 60 + 10; // 60 points between rows, 10 points margin

      // Adjust the y-coordinates for each text line within the form
      doc.text(`Floor ${i + 1}`, x, y);
      doc.text(`${labels[i].label1}: ${bill.bill1}`, x, y + 10);
      doc.text(`${labels[i].label2}: ${bill.bill2}`, x, y + 20);
      doc.text(`${labels[i].label3}: ${bill.bill3}`, x, y + 30);
      doc.text(`Total: ${bill.total}`, x, y + 40);
    });

    doc.save('bill-summary.pdf');
  };


  return (
    <div>
      <h2>Bill Calculator</h2>
      <div className='grid-container'>

        {bills.map((bill, index) => (
          <div key={index}>
            <h3>Floor {index + 1}</h3>

            <form>
            <button className='edit'>
                <FontAwesomeIcon icon={faPen} 
                onClick={() => toggleEdit(index, 'label1' , isEditingLabel, setEditLabel)}/>

              </button>

              {isEditingLabel[index].label1 ?
                <input
                  type='string'
                  value={labels[index].label1}
                  onChange={(e) => handleLabelChange(index, 'label1', e.target.value, labels, setLabel)}
              
                /> :
                <label>
                  {labels[index].label1}:
                  <input
                    type="number"
                    value={bill.bill1}
                    onChange={(e) => handleChange(index, 'bill1', e.target.value, bills, setBills)}
                  />
                </label>}
              <br /><br />
              <button className='edit'>
                <FontAwesomeIcon icon={faPen} 
                onClick={() => toggleEdit(index, 'label1' , isEditingLabel, setEditLabel)}/>

              </button>

              {isEditingLabel[index].label2 ?
                <input
                  type='string'
                  value={labels[index].label2}
                  onChange={(e) => handleLabelChange(index, 'label2', e.target.value, labels, setLabel)}
              
                /> :
                <label>
                  {labels[index].label3}:
                  <input
                    type="number"
                    value={bill.bill3}
                    onChange={(e) => handleChange(index, 'bill2', e.target.value, bills, setBills)}
                  />
                </label>}
              <br /><br />

              <button className='edit'>
                <FontAwesomeIcon icon={faPen} 
                onClick={() => toggleEdit(index, 'label2' , isEditingLabel, setEditLabel)}/>

              </button>

              {isEditingLabel[index].label3 ?
                <input
                  type='string'
                  value={labels[index].label3}
                  onChange={(e) => handleLabelChange(index, 'label3', e.target.value, labels, setLabel)}
              
                /> :
                <label>
                  {labels[index].label3}:
                  <input
                    type="number"
                    value={bill.bill3}
                    onChange={(e) => handleChange(index, 'bill3', e.target.value, bills, setBills)}
                  />
                </label>}
              <br /><br />

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
