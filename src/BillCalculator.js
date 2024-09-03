import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import './CSS/styles.css';
import './CSS/responsive_styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSave, faTimes, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { handleChange, handleFocus, handleLabelChange, toggleEdit, addAttribute, handleDeleteClick } from './Functions.js';
import { FlatName } from './EditFlatName.js';

function BillCalculator() {

  const [floorNo, setFloor] = useState(["Floor 1", "Floor 2", "Floor 3", "Floor 4"])


  const [bills, setBills] = useState([
    { bill1: 0, bill2: 0, bill3: 0, bill4: 0, bill5: 0, total: 0 },
    { bill1: 0, bill2: 0, bill3: 0, bill4: 0, bill5: 0, total: 0 },
    { bill1: 0, bill2: 0, bill3: 0, bill4: 0, bill5: 0, total: 0 },
    { bill1: 0, bill2: 0, bill3: 0, bill4: 0, bill5: 0, total: 0 },
  ]);

  const [labels, setLabel] = useState([
    { label1: 'Water Bill', label2: 'Gas Bill', label3: 'Motor Bill', label4: 'Service Charge', label5: 'Stair Cleaning' },
    { label1: 'Water Bill', label2: 'Gas Bill', label3: 'Motor Bill', label4: 'Service Charge', label5: 'Stair Cleaning' },
    { label1: 'Water Bill', label2: 'Gas Bill', label3: 'Motor Bill', label4: 'Service Charge', label5: 'Stair Cleaning' },
    { label1: 'Water Bill', label2: 'Gas Bill', label3: 'Motor Bill', label4: 'Service Charge', label5: 'Stair Cleaning' },
  ]);


  const [isEditingLabel, setEditLabel] = useState(
    Array(labels.length).fill({ label1: false, label2: false, label3: false, label4: false, label5: false })
  );

  const [backupLabels, setBackupLabels] = useState(labels);


//   const exportPDF = () => {
//     const doc = new jsPDF();

//     doc.setFont('helvetica'); // Set font style
//     doc.setFontSize(12); // Set font size

//     bills.forEach((bill, i) => {
//         const x = (i % 2) * 100 + 20; // Adjust x position
//         const y = Math.floor(i / 2) * 120 + 40; // Adjust y position for more spacing

//         // Set font size and style for the floor name
//         doc.setFontSize(14);
//         doc.setFont('helvetica', 'bold');
//         doc.text(` ${floorNo[i]}`, x + 20, y);

//         // Set font size and style for the rest of the text
//         doc.setFontSize(12);
//         doc.setFont('helvetica', 'normal');
//         doc.text(`${labels[i].label1}: ${bill.bill1}`, x, y + 10);
//         doc.text(`${labels[i].label2}: ${bill.bill2}`, x, y + 20);
//         doc.text(`${labels[i].label3}: ${bill.bill3}`, x, y + 30);
//         doc.text(`${labels[i].label4}: ${bill.bill4}`, x, y + 40);
//         doc.text(`${labels[i].label5}: ${bill.bill5}`, x, y + 50);
//         doc.line(x, y + 55, x + 60, y + 55);
//         doc.text(`Total: ${bill.total}`, x, y + 60);

//         // Add a horizontal line at the bottom right for signature
//         doc.line(x + 55, y + 85, x + 85, y + 85); // (x1, y1, x2, y2)

//         // Optional: Add a label for the signature line
//         doc.text('Signature', x + 60, y + 90); // (x, y)
//     });

//     doc.save('bill-summary.pdf');
// };

const exportPDF = () => {
  const doc = new jsPDF();

  doc.setFont('helvetica'); // Set font style
  doc.setFontSize(12); // Set font size

  bills.forEach((bill, i) => {
      const x = (i % 2) * 102 + 25; // Adjust x position
      const y = Math.floor(i / 2) * 130 + 40; // Adjust y position for more spacing

      // Set font size and style for the floor name
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(` ${floorNo[i]}`, x+20, y);

      // Calculate the maximum width of the labels dynamically
      const labelKeys = Object.keys(labels[i]);
      let labelWidth = 0;
      labelKeys.forEach(key => {
          const currentWidth = doc.getTextWidth(labels[i][key] + ':');
          if (currentWidth > labelWidth) {
              labelWidth = currentWidth;
          }
      });

      // Set font size and style for the rest of the text
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');

      // Align the labels and values dynamically
      labelKeys.forEach((key, index) => {
          const billKey = `bill${index + 1}`;
          doc.text(`${labels[i][key]}`, x, y + (index + 1) * 10);
          doc.text(` :   ${bill[billKey]}`, x + labelWidth + 2, y + (index + 1) * 10);
      });

      doc.line(x, y + (labelKeys.length + 1) * 10 - 5, x + 60, y + (labelKeys.length + 1) * 10 - 5);
      // Align the Total value
      doc.text(`Total`, x, y + (labelKeys.length + 1) * 10+1);
      doc.text(` :   ${bill.total}`, x + labelWidth + 2, y + (labelKeys.length + 1) * 10);

      // Add a horizontal line at the bottom right for signature
      doc.line(x, y + (labelKeys.length + 3) * 10, x + 30, y + (labelKeys.length + 3) * 10); // (x1, y1, x2, y2)
      doc.text('Signature', x + 5, y + (labelKeys.length + 3.5) * 10); // (x, y)
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

      <div className='update-buttons'>
        <button className='edit' type="button" onClick={() => startEditing(index, labelField)}>
          <FontAwesomeIcon icon={isEditingLabel[index][labelField] ? faSave : faPen} />
        </button>

    

        {!isEditingLabel[index][labelField] && (
          <button type="button" className='delete'
            onClick={() => {handleDeleteClick(index, billField, labelField, labels, bills, isEditingLabel, setLabel, setBills, setEditLabel)}}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}


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
          <div className='label-name'> {' ' + labels[index][labelField]}</div>:
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
      <h2 className='title'>Quick Bill</h2>

      <div className='pdf'>

        <button className='export' onClick={exportPDF}>Export as PDF</button>
      </div>

      <div className='grid-container'>


        {bills.map((bill, index) => (
          <div key={index} className='form-container'>
            {/* <h3>{floorNo[index]}</h3> */}
            <div style={{fontSize: '1.2rem'}}>
            <FlatName floorNo={floorNo} setFloor={setFloor} index={index} />
            </div>
            <form >
              <div className='labelsNames'>


                {Object.keys(bill).filter(key => key !== 'total').map((key) => (
                  renderInput(index, key, `label${key.replace('bill', '')}`)
                ))}


              </div>

              {/* add attribute button */}
              <button type="button" className='add' onClick={() => addAttribute(index, labels, bills, isEditingLabel, setLabel, setBills, setEditLabel)}>
                <FontAwesomeIcon icon={faPlus} /> Add Another Bill
              </button>

            </form>
            <p className='total'>Total: {bill.total}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default BillCalculator;

