import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import ModalDialog from "../ModalDialog";

/*
Button for adding row to table 

props 
  addRow: function for adding row to table
*/
const AddButton = ({ addRow }) => {
  //---------------------------------  ADD MODAL ------------------------------------------//

  const [openAddModal, setOpenAddModal] = useState(false);

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  return (
    <div>
      <Tooltip title="Add Employee">
        <IconButton onClick={handleOpenAddModal}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Tooltip>
      {/* Modal for adding row */}
      <ModalDialog
        open={openAddModal}
        handleClose={handleCloseAddModal}
        submitForm={addRow}
      />
    </div>
  );
};

export default AddButton;
