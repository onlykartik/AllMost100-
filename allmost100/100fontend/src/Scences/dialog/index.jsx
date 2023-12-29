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
      mode: 'cors',
        method :"POST",
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues)  
    }).then(res => res.json()).then(data =>{
        alert( "SUCCESS");
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
        Please double-check your form. Ensure correct email and mobile number entries
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Rest assured about the security of your data. We operate within a secure network. In the event that your request is declined, your data will be automatically deleted. Alternatively, feel free to contact our agent for manual deletion if needed.
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
