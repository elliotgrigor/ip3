
class ContactModel {
  constructor(
    address,
    phone,
    email,
  ) {
    return {
      address: address,
      phone: phone,
      email: email,
    }
  }
}

module.exports = ContactModel;
