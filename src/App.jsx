
import { useEffect, useState } from 'react';
import Auth from './Components/Auth';
import { db, auth, storage } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

function App() {
  const [employeeList, setEmployeeList] = useState([]);

  // New Employee State
  const [employeeDomain, setEmployeeDomain] = useState("");
  const [employeeJoining, setEmployeeJoining] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeQualification, setEmployeeQualification] = useState("");
  const [employeePhone, setEmployeePhone] = useState('');

  // UpdateName
  const [updateNames, setUpdateNames] = useState({});
  // UpdateQualification
  const [UpdateQualification, setUpdateQualification] = useState({});

  // upload file
  const [fileUpload, setFileUpload] = useState(null)

  const employeeCollectionRef = collection(db, "Employee Data");

  // Fetch Employee Data
  const getEmployeeList = async () => {
    try {
      const data = await getDocs(employeeCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEmployeeList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getEmployeeList();
  }, []);

  // Submit New Employee
  const submitData = async () => {
    try {
      await addDoc(employeeCollectionRef, {
        Domain: employeeDomain,
        Joining: employeeJoining,
        Name: employeeName,
        Qualification: employeeQualification,
        phone: employeePhone,
        userId: auth?.currentUser?.uid,
      });
      alert("Employee Added");
      setEmployeeDomain("");
      setEmployeeJoining("");
      setEmployeeName("");
      setEmployeeQualification("");
      setEmployeePhone("");
      getEmployeeList();
    } catch (err) {
      console.log(err);
    }
  };

  // Delete Employee
  const deleteEmployee = async (id) => {
    const EmployeeDoc = doc(db, "Employee Data", id);
    await deleteDoc(EmployeeDoc);
    setEmployeeList((prev) => prev.filter((employee) => employee.id !== id));
    alert("Employee Deleted");
  };

  // UpdateName
  const UpdateEmployeeName = async (id) => {
    const EmployeeDoc = doc(db, "Employee Data", id);
    await updateDoc(EmployeeDoc, { Name: updateNames[id] });

    // Update state directly
    setEmployeeList((prev) =>
      prev.map((employee) =>
        employee.id === id ? { ...employee, Name: updateNames[id] } : employee
      )
    );

    // Clear the input field
    setUpdateNames((prev) => ({ ...prev, [id]: "" }));
    alert("Employee Name Updated");
  };

  const handleUpdateNameChange = (id, value) => {
    setUpdateNames((prev) => ({ ...prev, [id]: value }));
  };

  // UpdateQualification
  const UpdateEmployeeQualification = async (id) => {
    const EmployeeDoc = doc(db, "Employee Data", id);
    await updateDoc(EmployeeDoc, { Name: UpdateQualification[id] });

    // Update state directly
    setEmployeeList((prev) =>
      prev.map((employee) =>
        employee.id === id ? { ...employee, Qualification: UpdateQualification[id] } : employee
      )
    );

    // Clear the input field
    setUpdateQualification((prev) => ({ ...prev, [id]: "" }));
    alert("Employee Qualification Updated");
  };

  const handleUpdateQualificationChange = (id, value) => {
    setUpdateQualification((prev) => ({ ...prev, [id]: value }));
  };

  const uploadFile = async () => {
    if (!fileUpload) return;

    const fileFolderRef = ref(storage, `FileFolder/${fileUpload.name}`);
    try {
      await uploadBytes(fileFolderRef, fileUpload);
      alert("File Uploaded");
      setFileUpload(null);
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <>
      <Auth />
      <div className="">
        <input type="text" placeholder="Domain" value={employeeDomain} onChange={(e) => setEmployeeDomain(e.target.value)} /> &nbsp;
        <input type="text" placeholder="Joining" value={employeeJoining} onChange={(e) => setEmployeeJoining(e.target.value)} /> &nbsp;
        <input type="text" placeholder="Name" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} /> &nbsp;
        <input type="text" placeholder="Qualification" value={employeeQualification} onChange={(e) => setEmployeeQualification(e.target.value)} /> &nbsp;
        <input type="number" placeholder="Phone" value={employeePhone} onChange={(e) => setEmployeePhone(Number(e.target.value))} /> &nbsp;
        <button onClick={submitData}>Add Employee</button>
      </div>
      <hr />
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {employeeList.map((data) => (
          <div key={data.id} style={{ border: "1px solid red", width: "250px", padding: "5px" }}>
            <p className="">Name: {data.Name}</p>
            <p className="">Phone: {data.phone}</p>
            <p className="">Joining: {data.Joining}</p>
            <p className="">Qualification: {data.Qualification}</p>
            <button onClick={() => deleteEmployee(data.id)}>Delete</button>
            <br />
            <br />
            <input
              type="text"
              placeholder="Update Name"
              value={updateNames[data.id] || ""}
              onChange={(e) => handleUpdateNameChange(data.id, e.target.value)}
            />
            <button onClick={() => UpdateEmployeeName(data.id)}>UPDATE Name</button>
            <br /><br />
            <input
              type="text"
              placeholder="Update Qualification"
              value={UpdateQualification[data.id] || ""}
              onChange={(e) => handleUpdateQualificationChange(data.id, e.target.value)}
            />
            <button onClick={() => UpdateEmployeeQualification(data.id)}>UPDATE Qualification</button>
          </div>
        ))}
      </div>

      <div className="">
        <input type="file"  onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </>
  );
}

export default App;
