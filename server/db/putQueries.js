const putQueries = {
  updateReported: (id, idName, table) => {
    let queryString =
      `UPDATE ${table} SET reported = true WHERE ${idName} = ${id};`

    return queryString

  },
  updateHelpfulness: (id, idName, updateColumn, table) => {
    let queryString =
      `UPDATE ${table} SET ${updateColumn} = ${updateColumn}+1 WHERE ${idName} = ${id};`

    return queryString
  }


}

module.exports = putQueries
