import ReactTable from "./ReactTable";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import DeleteButton from "./Buttons/DeleteButton";
import EditButton from "./Buttons/EditButton";
import axios from "axios";
import { nanoid } from "nanoid";

const EmployeeTable = () => {
  // ------------------------- FETCH EMPLOYEE DATA ------------------------- //
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/get")
      .then((response) => {
        // Handle the successful response here
        setEmployeeData(response.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error:", error);
      });
  }, []);

  // ------------------------- COLUMN DATA ------------------------- //
  // used by react-table to generate the column headers and table cells
  // also defines sort functions for sortable columns
  const columns = [
    {
      Header: "Name",
      accessor: "name",
      // Custom sorting function for case-insensitive alphabetical sorting
      sortable: true,
      sortType: (rowA, rowB, columnId) => {
        const valueA = rowA.values[columnId].toLowerCase();
        const valueB = rowB.values[columnId].toLowerCase();
        return valueA.localeCompare(valueB);
      },
    },
    {
      Header: "Occupation",
      accessor: "occupation",
      // Custom sorting function for case-insensitive alphabetical sorting
      sortable: true,
      sortType: (rowA, rowB, columnId) => {
        const valueA = rowA.values[columnId].toLowerCase();
        const valueB = rowB.values[columnId].toLowerCase();
        return valueA.localeCompare(valueB);
      },
    },
    {
      Header: "Age",
      accessor: "age",
      sortable: true,
    },
    {
      id: "actions",
      sortable: false,
      Header: () => (
        <div
          style={{
            textAlign: "right",
          }}
        >
          Actions
        </div>
      ),
      // rendering buttons for actions columns. Allows you to edit or delete a row
      Cell: ({ row, deleteRow, editRow }) => (
        <Stack direction="row" justifyContent="end">
          <EditButton editRow={editRow} row={row} />
          <DeleteButton deleteRow={deleteRow} id={row.original.id} />
        </Stack>
      ),
    },
  ];

  // ------------------------- ADDING EMPLOYEE ------------------------- //

  const addNewEmployee = (newEmployeeInfo) => {
    const newEmployee = { ...newEmployeeInfo };
    // generate new id for the employee
    newEmployee["id"] = nanoid();
    // insert employee into database
    axios
      .post("http://localhost:3001/api/insert", newEmployee)
      .then((response) => {
        // updating table in frontend after insertion is successful
        const updatedEmployeeData = [...employeeData, newEmployee];
        setEmployeeData(updatedEmployeeData);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error:", error);
      });
  };

  // // ------------------------- EDITING EMPLOYEE ------------------------- //

  const editEmployee = (updatedEmployee) => {
    // Send the PUT request using Axios
    axios
      .put("http://localhost:3001/api/update", updatedEmployee)
      .then((response) => {
        // updating employee in frontend after update in backend is successful
        const updatedEmployeeData = [...employeeData];
        const index = employeeData.findIndex(
          (row) => row.id === updatedEmployee.id
        );
        updatedEmployeeData[index] = updatedEmployee;
        setEmployeeData(updatedEmployeeData);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error:", error);
      });
  };

  // // ------------------------- DELETE EMPLOYEE ------------------------- //
  const deleteEmployee = (id) => {
    axios
      .delete(`http://localhost:3001/api/delete/${id}`)
      .then((response) => {
        // Handle the successful response here
        const updatedEmployeeData = [...employeeData];
        const index = employeeData.findIndex((row) => row.id === id);
        updatedEmployeeData.splice(index, 1);
        setEmployeeData(updatedEmployeeData);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error:", error);
      });
  };

  return (
    <ReactTable
      title="Employees"
      data={employeeData}
      columns={columns}
      addRow={addNewEmployee}
      editRow={editEmployee}
      deleteRow={deleteEmployee}
    />
  );
};

export default EmployeeTable;
