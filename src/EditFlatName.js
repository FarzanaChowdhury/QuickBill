import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useState} from "react";

export function FlatName({ floorNo, setFloor, index }) {
    const [editingFloorIndex, setEditingFloorIndex] = useState(null);
    const [currentFloorName, setCurrentFloorName] = useState('');

    const startEditingFloor = () => {
        setEditingFloorIndex(index);
        setCurrentFloorName(floorNo[index]);
    };

    const saveFloorName = () => {
        const newFloorNo = [...floorNo];
        newFloorNo[index] = currentFloorName;
        setFloor(newFloorNo);
        setEditingFloorIndex(null);
        setCurrentFloorName('');
    };

    const cancelEditingFloor = () => {
        setEditingFloorIndex(null);
        setCurrentFloorName('');
    };

    return (
        <div className='floor-item'>
            {editingFloorIndex === index ? (
                <>
                    <input
                        type='text'
                        value={currentFloorName}
                        onChange={(e) => setCurrentFloorName(e.target.value)}
                    />
                    <button onClick={saveFloorName}>Save</button>
                    <button onClick={cancelEditingFloor}>Cancel</button>
                </>
            ) : (
                <>
                <div className="button-align">
                <button onClick={startEditingFloor}><FontAwesomeIcon icon = {faPen}></FontAwesomeIcon></button>
                    <h3>{floorNo[index]}</h3>
                    </div>
                </>
            )}
        </div>
    );
}
