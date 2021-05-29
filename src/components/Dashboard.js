import { useEffect, useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
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

  console.log('customers', customers)
  const onSubmit = (e) => {
    e.preventDefault();
    const postObj = {createdBy: 1, first, last, date, profession, uid};
    axios.post("/customers", postObj)
    .then(res => {
      if (res.status === 200) {
        setCustomers([...customers, res.data])
        setFirst("");
        setLast("");
        setDate("");
        setProfession("")
        setUid("")
      }
    })
    .catch(err => {
      console.log("ERROR!", err)
    })

  }

  return (
    <div>
      <h1>
        Dashboard 
        <div>
          <Button
            variant="outlined"
            onClick={toggleAddCustomer}
            color={showAddCustomer ? "secondary" : "primary"}
            style={{width: 175}}
          >
            {showAddCustomer ? "Close" : "Add Customer"}
          </Button>
        </div>
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