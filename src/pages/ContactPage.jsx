import React, { useState, useEffect } from 'react';
import { Contact } from '../components/Contact';
import './styles/ContactPage.css';
import { ChangeForm } from '../components/ChangeForm';
import { AddForm } from '../components/AddForm';
import {TextField, MenuItem, CircularProgress, Alert} from '@mui/material';
import axios from "axios";
import zIndex from "@mui/material/styles/zIndex";


export const ContactPage = () => {
const [isLoading, setLoading] = useState(true);
const [openUpdateModal, setOpenUpdateModal] = useState(false);
const [openAddModal, setOpenAddModal] = useState(false);
const [contacts, setContacts] = useState(null);
const [contragents, setContragents] = useState(null);
const [currentId, setCurrentId] = useState(null);
const [currentEmailFilter, setCurrentEmailFilter] = useState(null);
const [currentContragentFilter, setCurrentContragentFilter] = useState(null);

const baseUrl = "http://localhost:80";

const openChangeForm = (contact) => {
    setCurrentId(contact.id);
    setOpenUpdateModal(true);
}

const addNewContact = async (contact) => {
        const response = await axios.post(`${baseUrl}/contacts`, contact).catch(err => { console.log(err) });
        if (response.status === 201) {
            await fetchAll();
        }
    setOpenAddModal(false);
}

const changeContact = async (name, email, contragent) => {
    const newContacts = [...contacts];
    const index = newContacts.findIndex((element) => element.id === currentId);
    newContacts[index].fullName = name;
    newContacts[index].email = email;
    newContacts[index].contragent = contragent;
    const response = await axios.put(`${baseUrl}/contacts?id=${currentId}`, newContacts[index])
        .catch(err => { console.log(err) });
    if (response.status === 200) {
        await fetchAll();
    }
    setOpenUpdateModal(false);
}

const addModalClose = () => {
    setOpenAddModal(false);
}

const updateModalClose = () => {
    setOpenUpdateModal(false);
}

const fetchContacts = async (emailFilter, contragentFilter) => {
    let request = `${baseUrl}/contacts`;
    if (emailFilter && contragentFilter) {
        request += `?contactEmail=${emailFilter}&contactsContrage=${contragentFilter}`;
    } else {
        if (emailFilter) {
            request += `?contactEmail=${emailFilter}`;
        }
        if (contragentFilter) {
            request += `?contactsContrage=${contragentFilter}`;
        }
    }

    const response = await axios
        .get(request)
        .catch(err => { console.log(err) });
    if (response.status === 200) {
        setContacts(response.data);
    }
}

const fetchContragents = async () => {
        const response = await axios.get(`${baseUrl}/contragents`)
            .catch(err => { console.log(err) });
        if (response.status === 200) {
            setContragents(response.data);
        }
}

const fetchAll = async () => {
    try {
        await fetchContacts();
        await fetchContragents();
        setLoading(false);
    } catch (error) {
        console.error("Error fetching contragents:", error);
    }
}


const removeContact = async (element) => {
        await axios.delete(`${baseUrl}/contacts?id=${element.id}`).then(async (response) => {
            if (response.status === 204) {
                await fetchContacts();
            }
        }).catch(err => { console.log(err) });
    setContacts(contacts.filter((conctact) => conctact.id !== element.id));
}

useEffect( () => {
    fetchAll();
}, []);

if (isLoading) {
    return <CircularProgress/>;
}
return (
    <div className='contact-page container'>
        <ChangeForm isOpen={openUpdateModal} close={updateModalClose} contragents={contragents} changeContact={changeContact}/>
        <AddForm addContact={addNewContact} close={addModalClose} contragents={contragents} isOpen={openAddModal}/>
        <button onClick={() => setOpenAddModal(true)} className="contact-page__button">
            Добавить
        </button>
        <div className="search__container">
            <TextField id="outlined-basic"
                       label="Введите email"
                       onChange={(e) => {
                           setCurrentEmailFilter(e.target.value);
                           fetchContacts(e.target.value, currentContragentFilter);
            }}
                       variant="outlined"/>
            <TextField
                id="outlined-select-currency"
                select
                label="Выберите контрагент"
                onChange={(e) => {
                    setCurrentContragentFilter(e.target.value);
                    fetchContacts(currentEmailFilter, e.target.value);
                }}
                sx={{width: 250}}
                >
                <MenuItem key={0} value={""}>
                    Все контрагенты
                </MenuItem>
                {contragents.map((option) => (
                    <MenuItem key={option} value={option.name}>
                        {option.name}
                    </MenuItem>
                ))}
            </TextField>
        </div>
        <div className="contacts__container">
            {contacts.map((contact) =>
                <Contact key={contact.id} contact={contact} openForm={openChangeForm} remove={removeContact}/>
            )}
        </div>
    </div>
)
}
