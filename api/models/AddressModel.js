
class AddressModel {
  constructor(
    houseNumber,
    street,
    postCode,
    city,
  ) {
    return {
      houseNumber: houseNumber,
      street: street,
      postCode: postCode,
      city: city,
    }
  }
}

module.exports = AddressModel;
