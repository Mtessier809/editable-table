import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddButton from "./Buttons/AddButton";

/*
Toolbar with table actions like adding a row

props 
  title: string for table title
  addRow: function for adding row to table
*/

const EnhancedToolbar = ({ title, addRow }) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%", fontWeight: "bold" }}
        variant="h6"
        textAlign="left"
      >
        {title}
      </Typography>
      <AddButton addRow={addRow} />
    </Toolbar>
  );
};

export default EnhancedToolbar;
