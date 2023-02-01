const getQueries = {
  getQuestion: (product_id, count, page) => {
    var queryString =
      `SELECT json_build_object (
      'product_id', ${product_id},
      'results',(
        SELECT json_agg(
          json_build_object(
            'question_id', question_id,
            'question_body',question_body,
            'question_date', submitted_date,
            'asker_name', username,
            'question_helpfulness',question_helpfulness,
            'reported', reported,
            'answers',(
              SELECT json_object_agg(
                  answer_id,(
                    SELECT json_build_object(
                      'id', answer_id,
                      'body', answer_body,
                      'date', submitted_date,
                      'answerer_name', username,
                      'reported', reported,
                      'helpfulness', answer_helpfulness,
                      'photos',
                        (SELECT COALESCE (json_agg(pic_url) FILTER(WHERE pic_url IS NOT NULL), '[]') FROM PHOTOS where photos.answer_id = answers.answer_id)
                    )
                  )
              ) FROM ANSWERS where answers.question_id = questions.question_id)
            )
          ) FROM QUESTIONS where product_id = ${product_id} limit ${count}
        )
      ) as questions;`
    return queryString
  },
  getAnswer: (question_id, count, page) => {
    var queryString =
      `SELECT json_build_object(
        'question', ${question_id},
        'count',${count},
        'page', ${page},
        'results',(
          SELECT json_agg(
            json_build_object(
              'answer_id', answer_id,
              'body', answer_body,
              'date', submitted_date,
              'answerer_name', username,
              'reported', reported,
              'helpfulness', answer_helpfulness,
              'photos',(
                SELECT COALESCE (json_agg(photos) FILTER(WHERE photos IS NOT NULL), '[]') FROM	(
                  SELECT photo_id, pic_url FROM PHOTOS where photos.answer_id = answers.answer_id
                ) photos
              )
            )
          ) FROM ANSWERS WHERE answers.question_id = ${question_id} limit ${count}
        )
      ) as answers;`

    return queryString

  }

}

module.exports = getQueries;
  // select coalesce(json_agg(pic_url) filter(where pic_url is not null), '[]') from photos where answer_id = 529814;

// SELECT json_build_object (
//   'product_id', 71697,
//   'results',(
//     SELECT json_agg(
//       json_build_object(
//         'question_id', question_id,
//         'question_body',question_body,
//         'question_date', submitted_date,
//         'asker_name', username,
//         'question_helpfulness',question_helpfulness,
//         'reported', reported,
//         'answers',(
//           SELECT json_object_agg(
//               answer_id,(
//                 SELECT json_build_object(
//                   'id', answer_id,
//                   'body', answer_body,
//                   'date', submitted_date,
//                   'answerer_name', username,
//                   'reported', reported,
//                   'helpful', answer_helpfulness,
//                   'photos',
//                     (SELECT COALESCE (json_agg(pic_url) FILTER(WHERE pic_url IS NOT NULL), '[]') FROM PHOTOS where photos.answer_id = answers.answer_id)
//                 )
//               )
//           ) FROM ANSWERS where answers.question_id = questions.question_id)
//         )
//       ) FROM QUESTIONS where product_id = 71697 limit 5
//     )
//   ) as questions;

  // select coalesce(json_agg(pic_url) filter(where pic_url is not null), '[]') from photos where answer_id = 529814;