import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import './CSS/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSave, faTimes, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { handleChange, handleFocus, handleLabelChange, toggleEdit, addAttribute, deleteAttribute, startEditingFloor, saveFloorName,cancelEditingFloor } from './Functions.js';

function BillCalculator() {

  const [floorNo, setFloor] = useState(["Floor 1", "Floor 2", "Floor 3", "Floor 4"])
  const [editingFloorIndex, setEditingFloorIndex] = useState(null);
  const [currentFloorName, setCurrentFloorName] = useState('');

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



  const exportPDF = () => {
    const doc = new jsPDF();

    bills.forEach((bill, i) => {
      const x = (i % 2) * 100 + 20;
      const y = Math.floor(i / 2) * 60 + 10;

      doc.text(`Floor ${i + 1}`, x, y);
      doc.text(`${labels[i].label1}: ${bill.bill1}`, x, y + 10);
      doc.text(`${labels[i].label2}: ${bill.bill2}`, x, y + 20);
      doc.text(`${labels[i].label3}: ${bill.bill3}`, x, y + 30);
      doc.text(`${labels[i].label4}: ${bill.bill4}`, x, y + 40);
      doc.text(`${labels[i].label5}: ${bill.bill5}`, x, y + 50);
      doc.text(`Total: ${bill.total}`, x, y + 60);
      doc.text('Mitu', x+50, y+80)
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

        {!isEditingLabel[index][labelField] && (
          <button type="button" className='delete'
            onClick={() => deleteAttribute(index, billField, labelField, labels, bills, isEditingLabel, setLabel, setBills, setEditLabel)}>
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
            {/* <h3><input defaultValue={"Floor {index + 1}"}></input></h3> */}

          
      {editingFloorIndex === index ? (
        <>
          <input
            type='text'
            value={currentFloorName}
            onChange={(e) => setCurrentFloorName(e.target.value)}
          />
          <button onClick={() => saveFloorName(index,setFloor, setEditingFloorIndex, setCurrentFloorName,currentFloorName, floorNo)}>Save</button>
          <button onClick={() => cancelEditingFloor(setEditingFloorIndex,setCurrentFloorName)}>Cancel</button>
        </>
      ) : (
        <>
          <span>{floorNo[index]}</span>
          <button onClick={() => startEditingFloor(index, setEditingFloorIndex, setCurrentFloorName, floorNo)}>Edit</button>
        </>
      )}
  




            <form>
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
            <p>Total: {bill.total}</p>
          </div>
        ))}
      </div>
      <button onClick={exportPDF}>Export as PDF</button>
    </div>
  );
}

export default BillCalculator;
