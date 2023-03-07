class PostQueryBuilder {
  constructor(perPage, offset, sort, type) {
    this.perPage = perPage;
    this.offset = offset;
    this.sort = sort;
    this.type = type;
  }

  typeFilterBuilder() {
    return this.type ? `WHERE rs.type = "${this.type}"` : "";
  }

  orderBuilder() {
    const sorting = {
      new: `p.created_at DESC`,
      best: `sc.scrapCount DESC`,
    };

    return Object.keys(sorting).includes(this.sort)
      ? `ORDER BY ${sorting[this.sort]}`
      : `ORDER BY ${sorting["new"]}`;
  }

  limitBuilder() {
    return `LIMIT ${this.perPage}`;
  }

  offsetBuilder() {
    return this.offset >= 0 ? `OFFSET ${this.offset}` : "";
  }

  build() {
    const filterQuery = [
      this.typeFilterBuilder(),
      this.orderBuilder(),
      this.limitBuilder(),
      this.offsetBuilder(),
    ];

    return filterQuery.join(" ");
  }
}

const roomStyleEnum = Object.freeze({
  MODERN: 1,
  VINTAGE: 2,
  LOVELY: 3,
});

const paymentMethodEnums = Object.freeze({
  POINT: 1,
  CARD: 2,
});

module.exports = { PostQueryBuilder, roomStyleEnum, paymentMethodEnums };
