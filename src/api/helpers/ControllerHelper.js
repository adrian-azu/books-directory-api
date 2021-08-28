// const express = require('express')
class ControllerHelper {
  paginate(model, page = 1, per_page = 5) {
    page = parseInt(page)
    per_page = parseInt(per_page);
    const startIndex = (page - 1) * per_page
    const endIndex = page * per_page
    const total = model.length
    const results = {}
    const lastPage = Math.max(Math.ceil(total / per_page), 1)
    const nextPage = lastPage > page ? page + 1 : 0;

    Object.assign(results,
      {
        attributes: model.slice(startIndex, endIndex),
        previous_page: page - 1,
        next_page: nextPage,
        last_page: lastPage,
        count: {
          total: total,
          per_page: per_page
        }
      })

    return results
  }
}

module.exports = ControllerHelper