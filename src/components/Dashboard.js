import { TextField, Button } from '@material-ui/core';
import { useState } from 'react';

export default function Dashboard() {

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [date, setDate] = useState("");
  const [profession, setProfession] = useState("");
  const [uid, setUid] = useState("");

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
      <TextField
        required
        type="text"
        id="first"
        label="First Name"
        value={first}
        variant="outlined"
        onChange={(e) => setFirst(e.target.value)}
      />

      <TextField
        required
        type="text"
        id="last"
        label="Last Name"
        value={last}
        variant="outlined"
        onChange={(e) => setLast(e.target.value)}
      />

      <TextField
        required
        type="text"
        id="date"
        label="Date"
        value={date}
        variant="outlined"
        onChange={(e) => setDate(e.target.value)}
      />

      <TextField
        required
        type="text"
        id="profession"
        label="Profession"
        value={profession}
        variant="outlined"
        onChange={(e) => setProfession(e.target.value)}
      />

      <TextField
        required
        type="text"
        id="uid"
        label="UID"
        value={uid}
        variant="outlined"
        onChange={(e) => setUid(e.target.value)}
      />



      <Button type="submit" variant="contained" onClick={(e) => onSubmit(e)}>
        Create Customer
      </Button>
    </div>
  )
}