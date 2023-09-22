import React from "react";

/*
Filter input component to apply filtering for each column

props 
  column: object that contains column data and functions to apply filters
*/

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <input
      placeholder={`Search ${column.Header}`}
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value)}
    />
  );
};

export default ColumnFilter;
