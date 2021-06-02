import { CSVLink } from "react-csv";
import PropTypes from 'prop-types';

export default function DownloadCSV(props) {
  const { customers, linkText } = props;

  const headers = [
    { label: "First Name", key: "first_name"},
    { label: "Last Name", key: "last_name"},
    { label: "Date Created", key: "date_created"},
    { label: "UID", key: "uid"},
    { label: "Profession", key: "profession"}
  ]

  return (
    <div>
      <CSVLink style={{textDecoration: 'none'}} data={customers} filename={"customers.csv"} headers={headers}>{linkText}</CSVLink>
    </div>
  )
}

DownloadCSV.propTypes = {
  customers: PropTypes.array.isRequired,
  linkText: PropTypes.string.isRequired
}