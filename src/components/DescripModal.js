import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import Editor from './Editor';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const DescripModal = ({idForEdit}) => {

    const [open, setOpen] = React.useState(false);
    // const [ckData, setCkData] = useState('')
    const { categories } = useSelector((state) => state.categories)
    // console.log(categories  )  
    // console.log(Array.isArray(categories))
    const existingCategory = categories.filter(product => product._id === idForEdit)

    const { _id,description } = existingCategory[0]

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    return (
      <div >
        <Button onClick={handleOpen}>
            <Typography style={{color:'black'}}>
                {description}
            </Typography>
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2"> 
            {<div dangerouslySetInnerHTML={{ __html: description }} />}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mb: 8 }}>
            {<div dangerouslySetInnerHTML={{ __html: description }} />}
            </Typography>

            <Button variant='contained'  component={RouterLink} to={`/ckEditor/${_id}`}>
              Edit
            </Button>
          </Box>
        </Modal>
      </div>
    );
}

export default DescripModal