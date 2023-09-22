import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Tooltip from "@mui/material/Tooltip";
import ModalDialog from "../ModalDialog";

/*
Button for editing row in table 

props 
  editRow: function to update row in table when form is submitted
*/
const EditButton = ({ editRow, row }) => {
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  return (
    <div>
      <Tooltip title="Edit">
        <IconButton
          aria-label="edit"
          color="success"
          size={"small"}
          onClick={handleOpenEditModal}
        >
          <BorderColorIcon />
        </IconButton>
      </Tooltip>

      {/* Edit Modal */}
      <ModalDialog
        open={openEditModal}
        handleClose={handleCloseEditModal}
        submitForm={editRow}
        rowToEdit={row}
      />
    </div>
  );
};

export default EditButton;
