const postQueries = {
  postQuestion: (reqData) => {
    let product_id = reqData.product_id
    let body = reqData.body
    let submitted_date = new Date().getTime()
    let username = reqData.name
    let email = reqData.email
    var queryString =
      `INSERT INTO questions (
        product_id,
        question_body,
        submitted_date,
        username,
        email) VALUES(
          ${product_id},
          '${body}',
          '${submitted_date}',
          '${username}',
          '${email}'
      );`
    return queryString
  },
  postAnswer: () => {
    // var queryString =
    //   `INSERT INTO`

    return queryString

  }

}

module.exports = postQueries;

//QUESTION_ID, PRODUCT_ID, QUESTION_BODY,SUBMITTED_DATE,USERNAME,EMAIL,REPORTED,QUESTION_HELPFULNESS