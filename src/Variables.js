export const [floorNo, setFloor] = useState(["Floor 1", "Floor 2", "Floor 3", "Floor 4"])

export const [bills, setBills] = useState([
  { bill1: 0, bill2: 0, bill3: 0, bill4: 0, bill5: 0, total: 0 },
  { bill1: 0, bill2: 0, bill3: 0, bill4: 0, bill5: 0, total: 0 },
  { bill1: 0, bill2: 0, bill3: 0, bill4: 0, bill5: 0, total: 0 },
  { bill1: 0, bill2: 0, bill3: 0, bill4: 0, bill5: 0, total: 0 },
]);

export const [labels, setLabel] = useState([
  { label1: 'Water Bill', label2: 'Gas Bill', label3: 'Motor Bill', label4: 'Service Charge', label5: 'Stair Cleaning' },
  { label1: 'Water Bill', label2: 'Gas Bill', label3: 'Motor Bill', label4: 'Service Charge', label5: 'Stair Cleaning' },
  { label1: 'Water Bill', label2: 'Gas Bill', label3: 'Motor Bill', label4: 'Service Charge', label5: 'Stair Cleaning' },
  { label1: 'Water Bill', label2: 'Gas Bill', label3: 'Motor Bill', label4: 'Service Charge', label5: 'Stair Cleaning' },
]);


export const [isEditingLabel, setEditLabel] = useState(
  Array(labels.length).fill({ label1: false, label2: false, label3: false, label4: false, label5: false })
);

export const [backupLabels, setBackupLabels] = useState(labels);

export const [editFloorIndex, setEditFlorrIndex] = useState(null)
export const [floorName, setFloorName] = useState('')