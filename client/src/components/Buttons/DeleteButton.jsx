import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

/*
Button for deleting row from a table 

props 
  deleteRow: function for deleting row from table when the delete button is clicked
*/
const DeleteButton = ({ deleteRow, id }) => {
  return (
    <Tooltip title="Delete">
      <IconButton
        aria-label="delete"
        color="error"
        onClick={() => deleteRow(id)}
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

export default DeleteButton;
