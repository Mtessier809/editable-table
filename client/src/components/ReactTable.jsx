// React hooks
import { useMemo } from "react";

// Project components
import ColumnFilter from "./ColumnFilter";
import EnhancedToolbar from "./EnhancedToolbar";

// Mui Material components
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Paper,
  TablePagination,
  TableSortLabel,
} from "@mui/material";

// react-table hooks
import { usePagination, useTable, useSortBy, useFilters } from "react-table";

/*
Editable table with client-side filtering, sorting, and pagination 

props 
  title: title of table to display at the top
  columns: object array with styling for each column
  data: object array with data to display in table 
  addRow: function for adding an entry
  editRow: function for editing an entry
  deleteRow: function for deleting an entry 
*/
const ReactTable = ({ title, columns, data, addRow, editRow, deleteRow }) => {
  // defining filter component for react-table
  const defaultColumn = useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    []
  );

  // defining table with useTable hook. Gives access to functions for handling pagination, filtering, and sorting
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    // pagination states and handlers
    state: { pageIndex, pageSize },
    gotoPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: false,
      autoResetSortBy: false,
      initialState: { pageIndex: 0, pageSize: 5 }, // Set the initial page index and page size,
      deleteRow,
      editRow,
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {/* Toolbar with table actions such as adding employee */}
        <EnhancedToolbar addRow={addRow} title={title} />
        {/* Table */}
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup, groupIndex) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} key={groupIndex}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    sx={{ fontWeight: "bold", verticalAlign: "top" }}
                    key={column.id}
                  >
                    {/* Column header */}
                    <div
                      {...column.getHeaderProps(
                        column.getSortByToggleProps({ title: undefined })
                      )}
                    >
                      {/* If column is sortable, wrap it with a sort label */}
                      {column.canSort ? (
                        <TableSortLabel
                          active={column.isSorted}
                          direction={column.isSortedDesc ? "desc" : "asc"}
                        >
                          {column.render("Header")}
                        </TableSortLabel>
                      ) : (
                        column.render("Header")
                      )}
                    </div>
                    {/* Filter component */}
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {/* mapping current page the user is on */}
            {page.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()} hover key={row.id}>
                  {row.cells.map((cell, cellIndex) => {
                    return (
                      <TableCell {...cell.getCellProps()} key={cellIndex}>
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={pageSize}
          page={pageIndex}
          onPageChange={(event, newPage) => {
            gotoPage(newPage);
          }}
          onRowsPerPageChange={(event) => {
            setPageSize(event.target.value);
          }}
        />
      </Paper>
    </Box>
  );
};

export default ReactTable;
