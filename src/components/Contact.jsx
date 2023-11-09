import React from 'react'
import './styles/contact.css'

export const Contact = ({contact, remove, openForm, contragent}) => {

    const removeContact = (contact) => {
        remove(contact);
    }
    
    const openChangeForm = (contact) => {
        openForm(contact);
    }

    return (
        <div className="contact">
            <h3 className="contact__title">
                Контакт
            </h3>
            <div className="contact__created">
                Дата создания: {new Date(String(contact.createdAt)).toLocaleString()}
            </div>
            <div className="contact__update">
                Дата изменения: {new Date(String(contact.updatedAt)).toLocaleString()}
            </div>
            <div className="contact__name">
                ФИО: {contact.fullname}
            </div>
            <div className="contact__email">
                Email: {contact.email}
            </div>
            <div className="contact__contragent">
                Контрагент: {contact.contragent.name}
            </div>
            <div className="contact__buttons">
                <button onClick={() => openChangeForm(contact)} className="contact__button update">
                    Изменить
                </button>
                <button onClick={() => removeContact(contact)} className="contact__button delete">
                    Удалить
                </button>
            </div>
        </div>
    )
}
