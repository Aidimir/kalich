export class Contact {
    id;
    fullname;
    email;
    updatedAt;
    createdAt;
    contragent;
    
    constructor(contact) {
        this.id = contact.id;
        this.fullname = contact.fullname;
        this.email = contact.email;
        this.updatedAt = new Date(String(contact.updatedAt)).toLocaleString();
        this.createdAt = new Date(String(contact.createdAt)).toLocaleString();
        this.contragent = contact.contragent;
    }


}