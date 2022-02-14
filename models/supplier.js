class Supplier {
  constructor(
    id,
    companyName,
    phonenumber,
    country,
    city,
    createdAt,
    updatedAt
  ) {
    this.id = id;
    this.companyName = companyName;
    this.phonenumber = phonenumber;
    this.country = country;
    this.city = city;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(data) {
    return new Supplier(
      data.supplier_id,
      data.company_name,
      data.phone_number,
      data.country,
      data.city,
      data.created_at,
      data.updated_at
    );
  }
}

module.exports = Supplier;
