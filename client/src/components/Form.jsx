import { Button, TextField, Typography, Paper, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

/*
  Form for adding or editing a row. Made with react-hook-form  

  props
    handleClose: function that closes modal if the user clicks on cancel button 
    submitForm: function that either adds or edits row when the submit button is clicked 
    defaultValues: object that pre-populates the form inputs if one is provided
*/
const Form = ({ handleClose, submitForm, defaultValues }) => {
  // defining form with useForm hook. Gives access to react-hook-form functions
  const { handleSubmit, control } = useForm({
    defaultValues: defaultValues,
  });

  // when user submits form it will call an api to update the table data
  const onSubmit = (data) => {
    submitForm(data);
    handleClose();
  };

  // form title depends on if default values were provided
  const formTitle =
    Object.getOwnPropertyNames(defaultValues).length === 0
      ? "Add Entry"
      : "Edit Entry";

  // submit button label depends on if default values were provided
  const submitButton =
    Object.getOwnPropertyNames(defaultValues).length === 0 ? "Submit" : "Save";

  return (
    <Paper elevation={3} style={{ padding: 16 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        {formTitle}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  inputProps={{
                    maxLength: 40,
                  }}
                  required
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="occupation"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Occupation"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  inputProps={{
                    maxLength: 40,
                  }}
                  required
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="age"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Age"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="number"
                  InputProps={{ inputProps: { min: 18, max: 100 } }}
                  required
                />
              )}
            />
          </Grid>
          <Grid item xs={12} container justifyContent="end" gap={2}>
            <Button type="submit" variant="contained" color="primary">
              {submitButton}
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="error"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Form;
