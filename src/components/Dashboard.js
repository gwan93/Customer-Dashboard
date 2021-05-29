import { TextField, Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Customers from './Customers';

const useStyles = makeStyles({
  formElement: {
    display: 'block'
  }
});

export default function Dashboard() {
  const classes = useStyles();
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [date, setDate] = useState("");
  const [profession, setProfession] = useState("");
  const [uid, setUid] = useState("");
  const [customers, setCustomers] = useState([]);


  useEffect(() => {
    const dataFromServer = async () => {
      const res = await axios.get("/customers");
      setCustomers(res.data);
    }

    dataFromServer();

  }, [])


  const onSubmit = (e) => {
    e.preventDefault();
    console.log(first, last, date, profession, uid);
    // post information
    // set loading
    // analyze response
    // if fail then show error message
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <Customers customers={customers}/>
      </div>
      
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
        id="date"
        label="Date"
        value={date}
        variant="outlined"
        onChange={(e) => setDate(e.target.value)}
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

      <TextField
        required
        type="text"
        id="uid"
        label="UID"
        value={uid}
        variant="outlined"
        onChange={(e) => setUid(e.target.value)}
        className={classes.formElement}
      />



      <Button type="submit" variant="contained" onClick={(e) => onSubmit(e)}>
        Create Customer
      </Button>
    </div>
  )
}