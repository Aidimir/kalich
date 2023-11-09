import { useState } from "react"
import React from 'react'
import { Contact } from "../classes/Contact.js"
import './styles/form.css'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, Select, MenuItem} from "@mui/material"

export const AddForm = ({isOpen, contragents, addContact, close}) => {
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [contragent, setContragent] = useState(null);
  
    const submit = (e) => {
        e.preventDefault();
        const newContact = {
            fullname: name,
            email: email,
            contragent: contragent
        }

        const contact = new Contact(newContact);

        addContact(contact)
    }
  
    const handleClose = () => {
        close()
    };

    if (isOpen) {
      return (
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Добавить контакт</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <form className="form">
                            <TextField required variant="outlined" type="text" onChange={(e) => setName(e.target.value)} placeholder='Введите ФИО'/>
                            <TextField required variant="outlined" type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Введите email'/>
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
                                Добавить
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
