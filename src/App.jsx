import { useEffect, useState } from 'react'
import Auth from './Components/Auth'
import Hello from './Components/Hello'
import { db } from './config/firebase'
import { getDocs, collection, addDoc, deleteDoc, doc } from 'firebase/firestore'

function App() {
  const [employeeList, setEmployeeList] = useState([]);

  // New Employee State
  const [employeeDomain, setEmployeeDomain] = useState("")
  const [employeeJoining, setEmployeeJoining] = useState("")
  const [employeeName, setEmployeeName] = useState("")
  const [employeeQualification, setEmployeeQualification] = useState("")
  const [employeePhone, setEmployeePhone] = useState(0)

  const employeeCollectionRef = collection(db, "Employee Data")
  // console.log(employeeDomain)

  // Fetch Employee Data
  const getEmployeeList = async () => {
    try {
      const data = await getDocs(employeeCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
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
      });
      alert("Employee Added")
      setEmployeeDomain("")
      setEmployeeJoining("")
      setEmployeeName("")
      setEmployeeQualification("")
      setEmployeePhone("")
      getEmploeeList();
    } catch (err) {
      console.log(err)
    }
  };

  // Delete Employee
  const deleteEmployee = async (id) => {
    const EmployeeDoc = doc(db, "Employee Data", id);
    await deleteDoc(EmployeeDoc);
    setEmployeeList((prev) => prev.filter((employee) => employee.id !== id));
    alert("Employee Deleted");
  }


  return (
    <>
      <Auth />

      <div className="">
        <input type="text" placeholder='Domain' value={employeeDomain} onChange={(e) => setEmployeeDomain(e.target.value)} /> &nbsp;
        <input type="text" placeholder='Joining' value={employeeJoining} onChange={(e) => setEmployeeJoining(e.target.value)} /> &nbsp;
        <input type="text" placeholder='Name' value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} /> &nbsp;
        <input type="text" placeholder='Qualification' value={employeeQualification} onChange={(e) => setEmployeeQualification(e.target.value)} /> &nbsp;
        <input type="number" placeholder='Phone' value={employeePhone} onChange={(e) => setEmployeePhone(Number(e.target.value))} /> &nbsp;
        <button onClick={submitData}>Add Employee</button>
      </div>
      <hr />
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {
          employeeList.map((data) => (
            <div key={data.id} style={{ border: "1px solid red", width: "250px", padding: "5px" }}>
              <p className="">Name: {data.Name}</p>
              <p className="">Phone: {data.phone}</p>
              <p className="">Joining: {data.Joining}</p>
              <p className="">Qualification: {data.Qualification}</p>
              <button onClick={() => deleteEmployee(data.id)}>Delete</button>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
