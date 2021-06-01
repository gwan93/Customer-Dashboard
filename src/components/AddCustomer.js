import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography } from '@material-ui/core';


const useStyles = makeStyles({
  createForm: {
    display: "flex",
    justifyContent: "flex-start"
  },
  createButton: {
    width: '100px'
  },
  saveButton: {
    display: 'flex',
    flex: 1,
    alignItems: 'center'
  }
});

export default function AddCustomer(props) {
  const classes = useStyles();
  const {first, setFirst, last, setLast, profession, setProfession, onSubmit } = props;
  
  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>Create Customer</Typography>
      <div className={classes.createForm}>
        <TextField
          required
          type="text"
          id="first"
          label="First Name"
          value={first}
          variant="outlined"
          onChange={(e) => setFirst(e.target.value)}
          className={classes.formElement}
        />

        <TextField
          required
          type="text"
          id="last"
          label="Last Name"
          value={last}
          variant="outlined"
          onChange={(e) => setLast(e.target.value)}
          className={classes.formElement}
        />

        <TextField
          required
          type="text"
          id="profession"
          label="Profession"
          value={profession}
          variant="outlined"
          onChange={(e) => setProfession(e.target.value)}
          className={classes.formElement}
        />
      </div>
      <div className={classes.saveButton}>
        <Button type="submit" variant="contained" className={classes.createButton} onClick={(e) => onSubmit(e)}>
          Save
        </Button>
      </div>
    </>
  );
}
