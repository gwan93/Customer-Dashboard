import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from '@material-ui/core';


const useStyles = makeStyles({
  formElement: {
    display: "block",
  },
});

export default function AddCustomer(props) {
  const classes = useStyles();
  const {first, setFirst, last, setLast, profession, setProfession, onSubmit } = props;
  
  return (
    <>
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

      <Button type="submit" variant="contained" onClick={(e) => onSubmit(e)}>
        Create Customer
      </Button>
    </>
  );
}
