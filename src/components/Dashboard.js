import { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';
import Customers from './Customers';
import AddCustomer from './AddCustomer';
import Logout from './Logout';

export default function Dashboard(props) {
  const { state, setState, removeCookie, username } = props;
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [profession, setProfession] = useState("");
  const [customers, setCustomers] = useState([]);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios.get("/customers")
    .then(res => {
      setCustomers(res.data)
    })

    // Cleanup if Dashboard is unmounted before the above async request completes
    return () => {
      setCustomers([]);
    }
  }, [])

  const toggleAddCustomer = () => {
    setShowAddCustomer(!showAddCustomer)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const createdBy = state.userId;
    if (!createdBy || !first || !last || !profession) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }
    const postObj = {createdBy, first, last, profession};
    axios.post("/customers", postObj)
    .then(res => {
      if (res.status === 200) {
        setCustomers([...customers, res.data])
        setFirst("");
        setLast("");
        setProfession("");
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
          profession={profession}
          setProfession={setProfession}
          onSubmit={onSubmit}
        />
      )}
      {errorMessage.length !== 0 && <h6>{errorMessage}</h6>}
      <Customers customers={customers} />
    </div>
  );
}