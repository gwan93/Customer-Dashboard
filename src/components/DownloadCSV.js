import { CSVLink } from "react-csv";


export default function DownloadCSV(props) {
  const { customers } = props;

  const headers = [
    { label: "First Name", key: "first_name"},
    { label: "Last Name", key: "last_name"},
    { label: "Date Created", key: "date_created"},
    { label: "UID", key: "uid"},
    { label: "Profession", key: "profession"}
  ]

  return (
    <div>
      <CSVLink data={customers} filename={"customers.csv"} headers={headers}>Download as CSV</CSVLink>
    </div>
  )
}