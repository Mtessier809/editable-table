import { Dialog } from "@mui/material";
import Form from "./Form";

/*
Modal used for adding or editing a row

props 
  open: boolean used to determine if modal is open or not
  handleClose: function that closes modal when the user clicks off of it or clicks the cancel button on a form
  submitForm: function handler for form submission. Either edits or adds a row
  rowToEdit: selected row when a user clicks on edit button, otherwise it is null
*/
const ModalDialog = ({ open, handleClose, submitForm, rowToEdit }) => {
  // if a row to edit is provided, we want the inputs to be prepopulated with the current row data
  const defaultValues = rowToEdit ? rowToEdit.original : {};
  return (
    <Dialog open={open} onClose={handleClose}>
      <Form
        handleClose={handleClose}
        submitForm={submitForm}
        defaultValues={defaultValues}
      />
    </Dialog>
  );
};

export default ModalDialog;
