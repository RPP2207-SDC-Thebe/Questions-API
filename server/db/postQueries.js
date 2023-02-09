const postQueries = {
  postQuestion: (reqData) => {
    let product_id = reqData.product_id
    let body = reqData.body
    let submitted_date = new Date().getTime()
    let username = reqData.name
    let email = reqData.email

    if (!product_id || !body || !username || !email) {
      return null
    }
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
  postAnswer: (question_id, reqData) => {
    let body = reqData.body
    let submitted_date = new Date().getTime()
    let username = reqData.name
    let email = reqData.email

    if (!question_id || !body || !username || !email) {
      return null
    }
    var queryString =
      `INSERT INTO answers (question_id,
        answer_body,
        submitted_date,
        username,
        email) VALUES(
          ${question_id},
          '${body}',
          '${submitted_date}',
          '${username}',
          '${email}'
        ) RETURNING answer_id;`
    return queryString

  },
  postPhoto: (answer_id, pic_url) => {
    var queryString =
      `INSERT INTO photos (answer_id,
        pic_url) VALUES(
          ${answer_id},
          '${pic_url}'
        );`
    return queryString
  }

}

module.exports = postQueries;

//QUESTION_ID, PRODUCT_ID, QUESTION_BODY,SUBMITTED_DATE,USERNAME,EMAIL,REPORTED,QUESTION_HELPFULNESS