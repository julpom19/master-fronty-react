import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const ConfirmQuitDialog = ({ showDialog,  cancelNavigation, confirmNavigation, }) => {
  return (
    <Dialog open={showDialog} onClose={cancelNavigation}>
      <DialogTitle>
        Warning
      </DialogTitle>
      <DialogContent>
        You have not finished quiz. Current result will be lost. Do you want to proceed anyway?
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelNavigation}>No</Button>
        <Button onClick={confirmNavigation}>Yes</Button>
      </DialogActions>
    </Dialog>
  )
};

export default ConfirmQuitDialog;