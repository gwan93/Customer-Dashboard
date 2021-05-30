import { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';
import Customers from './Customers';
import AddCustomer from './AddCustomer';
import Logout from './Logout';

export default function Dashboard(props) {
  const { username } = props.state;
  const { state, setState, removeCookie } = props;
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [date, setDate] = useState("");
  const [profession, setProfession] = useState("");
  const [uid, setUid] = useState("");
  const [customers, setCustomers] = useState([]);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    const createdBy = state.userId;
    if (!createdBy || !first || !last || !date || !profession || !uid) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }
    const postObj = {createdBy, first, last, date, profession, uid};
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
      <h1>Dashboard</h1>
      <h2>Welcome, {username}</h2>
      <Logout setState={setState} removeCookie={removeCookie}/>
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
      {errorMessage.length !== 0 && <h6>{errorMessage}</h6>}
      <Customers customers={customers} />
    </div>
  );
}