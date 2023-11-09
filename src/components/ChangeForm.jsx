import React, {useState} from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, Select, MenuItem} from "@mui/material"


export const ChangeForm = ({isOpen, changeContact, close, contragents}) => {
  
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [contragent, setContragent] = useState(null);

  const submit = (e) => {
      e.preventDefault();
      changeContact(name, email, contragent);
  }

  const handleClose = () => {
    close()
  };

if (isOpen) {
  return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Изменить контакт</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <form className="form">
                        <TextField id="outlined-basic" variant="outlined" type="text" onChange={(e) => setName(e.target.value)} placeholder='Введите ФИО'/>
                        <TextField id="outlined-basic" variant="outlined" type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Введите email'/>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Выберите контрагент"
                                onChange={(e) => setContragent(e.target.value)}
                              >
                                {contragents.map((option) => (
                                    <MenuItem key={option} value={option.name}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        <Button variant="contained" onClick={(e) => submit(e)} className="form__button btn">
                            Изменить
                        </Button>
                    </form>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
  )
}
}
