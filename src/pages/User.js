import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Modal,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Paper,
  Typography,
  TableContainer,
  TablePagination,
  AvatarGroup,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress'
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import { addProduct, deleteProduct } from '../redux/products/productsSlice';
import { getCategories, deleteCategory } from '../redux/products/categorySlice';
import DescripModal from '../components/DescripModal';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'avatar', label: 'Avatar', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
    // { id: 'price', label: 'Price', alignRight: false },
    // { id: 'Availability', label: 'Availability', alignRight: false },
    // { id: 'isVerified', label: 'Verified', alignRight: false },
    // { id: 'status', label: 'Status', alignRight: false },
  // { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

 
export default function User() {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  // const [categoryData, setCategoryData] = useState(categories || [])

  // const productList = useSelector((state) => state.products)
  // console.log(productList, 'products')
  const { categories, loading } = useSelector((state) => state.categories)
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch] )

  // useEffect(() => {
  //   console.log(categories)
  // },[categories])
  // setCategoryData(categoryData, 'categories')
  console.log(categories, 'categories')
  // console.log(categories.categories, 'categories')


  // console.log(categoryData, 'state from local')


  // if (loading) {
  //    console.log('loading ......')} else {console.log('not loading....')
  //   }

  // if (categories) {
  //   // console.log(categories.map(item => console.log(item)), 'categories')
  // }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = categories && categories.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tour ?")) {
      dispatch(deleteCategory(id))
    }
  };

  // const list = categories.map(item => item.images.map(i => i.img))
  
  // console.log(list)
  // useEffect(() => {
  // //   // const headers = {"Access-Control-Allow-Origin" : "*"}
  //   axios.get('https://6db3-2405-201-2009-c839-964d-9693-5038-a4a2.ngrok.io/category', {headers:{
  //     "ngrok-skip-browser-warning": "69420",
  //   }})
  //   .then(res => console.log(res))
  //   .catch(err => console.log(err))
  //   // const config = {
  //   //   method: 'get',
  //   //   url: 'https://5201-2405-201-2009-c1e2-5e8f-9b62-8f91-83a5.ngrok.io/category',
  //   //   headers: {"Access-Control-Allow-Origin" : "*" },
  //   //   // data : data
  //   // };
    
  // //   // axios(config)
  // //   // .then((response) => {
  // //   //   console.log(JSON.stringify(response.data));
  // //   // })
  // //   // .catch((error) => {
  // //   //   console.log(error);
  // //   // });
    
  // },[])
  // console.log(categories.map(item => item.images.map(item => item.img)))

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categories && categories.length) : 0;

  const filteredUsers = applySortFilter(categories && categories, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  // console.log(process.env.REACT_APP_BASE_URL)
  return (
      <>
      {loading ?
        <Container sx={{marginLeft: 50}}>
          <CircularProgress />
        </Container> 
        :
        <Page title="User">
        <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button variant="contained" component={RouterLink} to="/addProduct" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={categories.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { _id, name,avatar, email,first_name, last_name  } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;
                      // console.log(avatar, 'avatar')
                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              {/* <AvatarGroup> */}
                              {/* {images && images.map((img, i) => ( */}
                                <img alt={name} src={avatar} 
                                style={{ maxHeight:'50px', borderRadius:'50%', maxWidth:'50px' }}   
                                />
                              {/* ))} */}
                              {/* </AvatarGroup> */}
                              {/* <img src='public/assets/images/1666169028673.png' alt='name' /> */}
                              
                            </Stack>
                          </TableCell>
                          <TableCell align='left'>
                            <Typography variant="subtitle2" noWrap>
                                {first_name}  {last_name}
                              </Typography>
                          </TableCell>
                          {/* <TableCell align="left">
                            <Paper elevation={3} style={{padding:'7px'}}> */}
                              {/* {console.log(description, 'descrip')} */}
                                {/* <DescripModal idForEdit={_id}/>
                                
                            </Paper>
                          </TableCell> */}
                          <TableCell align="left">{email}</TableCell>
                          {/* <TableCell align="left">{first_name}</TableCell> */}
                          {/* <TableCell align="left">{stockAvailable ? 'Yes' : 'No'}</TableCell> */}
                          {/* <TableCell align="left">
                          <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                            {sentenceCase(status)}
                          </Label>
                        </TableCell> */}

                          <TableCell align="right">
                            {/* <UserMoreMenu />   */}
                            <Button variant='contained' component={RouterLink} to="#" onClick={() => handleDelete(_id)}>
                              <Iconify icon="eva:edit-fill" width={14} height={14} />
                              Delete 
                            </Button>
                          </TableCell>
                          <TableCell align="right">
                            {/* <UserMoreMenu />   */}
                            <Button variant="contained" component={RouterLink} to={`/editProduct/${_id}`} startIcon={<Iconify icon="eva:edit-fill" width={14} height={14} />}>
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                        "Add Categories"
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={categories.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      </Page>
      }
      </>
  );
}
