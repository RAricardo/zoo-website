import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

interface UpdateCheckupModalProps {
  open: boolean;
  onClose: () => void;
  onUpdate: (newCheckupDate: Date | null) => void;
}

const UpdateCheckupModal: React.FC<UpdateCheckupModalProps> = ({
  open,
  onClose,
  onUpdate,
}) => {
  const [newCheckupDate, setNewCheckupDate] = useState<Date | null>(null);

  const handleUpdateCheckup = () => {
    onUpdate(newCheckupDate);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div>
        <DialogTitle>Update Checkup Date</DialogTitle>
      </div>
      <DialogContent sx={{ marginX: 10 }}>
        <TextField
          id="checkup-date"
          label="New Checkup Date"
          type="date"
          value={newCheckupDate?.toISOString().substring(0, 10) || ""}
          onChange={(e) => setNewCheckupDate(new Date(e.target.value))}
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdateCheckup} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateCheckupModal;
