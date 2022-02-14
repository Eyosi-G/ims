class ProductFull {
  constructor(
    id,
    name,
    description,
    weight,
    color,
    countryManufactured,
    isOriginal,
    yearManufactured
  ) {
    this.name = name;
    this.description = description;
    this.id = id;
    this.weight = weight;
    this.color = color;
    this.countryManufactured = countryManufactured;
    this.isOriginal = isOriginal;
    this.yearManufactured = yearManufactured;
  }

  static fromJson(data) {
    return new ProductFull(
      data.product_id,
      data.product_name,
      data.description,
      data.weight,
      data.color,
      data.country_made_in,
      data.is_original,
      data.year_made_in
    );
  }
}

module.exports = ProductFull;
