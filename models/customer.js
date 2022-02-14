class Customer {
  constructor(
    id,
    firstname,
    lastname,
    phonenumber,
    dob,
    sex,
    createdAt,
    updatedAt
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.phonenumber = phonenumber;
    this.dob = dob;
    this.sex = sex;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(data) {
    return new Customer(
      data.customer_id,
      data.first_name,
      data.last_name,
      data.phone_number,
      data.dob,
      data.sex,
      data.created_at,
      data.updated_at
    );
  }
}

module.exports = Customer;
