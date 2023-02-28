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

module.exports = { PostQueryBuilder };
