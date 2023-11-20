import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


 function ConfirmDialog(props) {
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
    // form data is here
    const formValues = props.data;
    console.log(formValues);


    fetch("http://localhost:5000/filledForm",
    {
        method :"POST",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues)  
    }).then(res => res.json()).then(data =>{
        alert(data.toString())


    })
   
  };


  return (
    <div>
      <Button variant="contained" type='submit' onClick={handleClickOpen}>
        Request mentor
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Lorem ipsum dolor sit amet.
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis, possimus?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button type='submit' onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default ConfirmDialog;
