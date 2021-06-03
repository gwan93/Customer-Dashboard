import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Table,TableBody,TableCell, TableContainer, TableFooter, TablePagination, TableRow, Typography, TableHead, IconButton} from '@material-ui/core';
import {KeyboardArrowLeft, KeyboardArrowRight} from '@material-ui/icons';
import FirstPageIcon from '@material-ui/icons/FirstPage'
import LastPageIcon from '@material-ui/icons/LastPage'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ClearIcon from '@material-ui/icons/Clear';
import DownloadCSV from './DownloadCSV';
import moment from 'moment';

// Styling and component logic for pagination row
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// Styling and component logic for table
const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
  tableHead: {
    fontWeight: 900,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  delete: {
    cursor: 'pointer'
  }
});

export default function Customers(props) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { customers, myCustomers, onDelete } = props;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, customers.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <TableContainer>
      <header className={classes.header}>
        <div>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>All Customers</Typography>
        </div>
        <div className={classes.headerRight}>
          <DownloadCSV customers={customers} linkText="Export All Customers (CSV)"/>
          <DownloadCSV customers={myCustomers} linkText="Export Customers Created By Me (CSV)"/>
        </div>
      </header>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHead} align="left">First Name</TableCell>
            <TableCell className={classes.tableHead} align="left">Last Name</TableCell>
            <TableCell className={classes.tableHead} align="left">Profession</TableCell>
            <TableCell className={classes.tableHead} align="left">Created On</TableCell>
            <TableCell className={classes.tableHead} align="left">UID</TableCell>
            <TableCell className={classes.tableHead} align="left"><DeleteForeverIcon /></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : customers
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                {row.first_name}
              </TableCell>
              <TableCell>
                {row.last_name}
              </TableCell>
              <TableCell>
                {row.profession}
              </TableCell>
              <TableCell>
                {moment.utc(row.date_created).local().format('MMMM Do YYYY, h:mm:ss a')}
              </TableCell>
              <TableCell>
                {row.uid}
              </TableCell>
              <TableCell>
                <ClearIcon className={classes.delete} onClick={(e) => onDelete(e, row.id)}/>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={5}
              count={customers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

Customers.propTypes = {
  state: PropTypes.shape({
    username: PropTypes.string,
    userId: PropTypes.oneOfType([ PropTypes.bool, PropTypes.number ])
  }).isRequired,
  customers: PropTypes.array.isRequired,
  myCustomers: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired
}