import { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';
import Customers from './Customers';
import AddCustomer from './AddCustomer';


export default function Dashboard() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [date, setDate] = useState("");
  const [profession, setProfession] = useState("");
  const [uid, setUid] = useState("");
  const [customers, setCustomers] = useState([]);
  const [showAddCustomer, setShowAddCustomer] = useState(false);


  useEffect(() => {
    const dataFromServer = async () => {
      const res = await axios.get("/customers");
      setCustomers(res.data);
    }

    dataFromServer();

  }, [])

  const toggleAddCustomer = () => {
    setShowAddCustomer(!showAddCustomer)
  }


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
      <h1>
        Dashboard
        <Button
          variant="outlined"
          onClick={toggleAddCustomer}
          color={showAddCustomer ? "secondary" : "primary"}
          style={{width: 175}}
        >
          {showAddCustomer ? "Close" : "Add Customer"}
        </Button>
      </h1>
      {showAddCustomer && (
        <AddCustomer
          first={first}
          setFirst={setFirst}
          last={last}
          setLast={setLast}
          date={date}
          setDate={setDate}
          profession={profession}
          setProfession={setProfession}
          uid={uid}
          setUid={setUid}
          onSubmit={onSubmit}
        />
      )}
      <Customers customers={customers} />
    </div>
  );
}