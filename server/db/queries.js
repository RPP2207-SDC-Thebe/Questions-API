const queries = {
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
                      'helpful', answer_helpfulness,
                      'photos',
                        (SELECT json_agg(pic_url) FROM PHOTOS where photos.answer_id = answers.answer_id)
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
              'helpful', answer_helpfulness,
              'photos',(
                SELECT json_agg(photos) FROM	(
                  SELECT photo_id, pic_url FROM PHOTOS where photos.answer_id = answers.answer_id
                ) photos
              )
            )
          ) FROM ANSWERS WHERE answers.question_id = ${question_id} AND reported = false limit ${count}
        )
      ) as answers;`

    return queryString

  }
}

module.exports = queries;


// SELECT json_build_object(
//   'question', 271356,
//   'count',5,
//   'page', 1,
//   'results',(
//     SELECT json_agg(
//       json_build_object(
//         'answer_id', answer_id,
//         'body', answer_body,
//         'date', submitted_date,
//         'answerer_name', username,
//         'reported', reported,
//         'helpful', answer_helpfulness,
//         'photos',(
//           SELECT json_agg(photos) FROM	(
//             SELECT photo_id, pic_url FROM PHOTOS where photos.answer_id = answers.answer_id
//           ) photos
//         )
//       )
//     ) FROM ANSWERS WHERE answers.question_id = 271356 AND reported = false limit 5
//   )
// ) as answers;


// `SELECT json_build_object(
//   'product_id', 71700,
//   'result',(
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
//                     (SELECT json_agg(pic_url) FROM PHOTOS where photos.answer_id = answers.answer_id)
//                 )
//               )
//           ) FROM ANSWERS where answers.question_id = questions.question_id)
//         )
//       ) FROM QUESTIONS where product_id = 71700 limit 2
//     )
//   );`

// result:

// {
//   "product_id" : 71700, "result" : [{ "question_id": 252177, "question_body": "Eum perspiciatis et libero eum veritatis deserunt.", "question_date": 1593251556971, "asker_name": "Lysanne_Kassulke", "question_helpfulness": 27, "reported": false, "answers": null }, {
//     "question_id": 252178, "question_body": "Fugit reprehenderit placeat rerum ducimus non sunt.", "question_date": 1589228644005, "asker_name": "Aileen54", "question_helpfulness": 8, "reported": false, "answers": {
//       "492240": { "id": 492240, "body": "Voluptatem corporis et et neque et est non quo nesciunt.", "date": 1590956976525, "answerer_name": "Javon_Wolff", "reported": false, "helpful": 12, "photos": null }, "492241": {
//         "id": 492241, "body": "Iusto est sint.", "date": 1603019686251, "answerer_name": "Cielo.Terr
// y54", "reported" : false, "helpful" : 9, "photos" : null}, "492242" : {"id" : 492242, "body" : "Ea rerum mollitia illum ducimus vel molestias quos at.", "date" : 1604515252037, "answerer_name" : "Jessi
// ka.Haag", "reported" : false, "helpful" : 7, "photos" : null}, "492243" : {"id" : 492243, "body" : "Ut nobis fugiat.", "date" : 1595913675726, "answerer_name" : "Maureen_Schaden39", "reported" : false,
//  "helpful" : 11, "photos": null
//       }, "492244": {
//         "id": 492244, "body": "Ut eum at voluptas eligendi odit iure dolorem.", "date": 1616397588464, "answerer_name": "Keon_Considine58", "reported": false
//         , "helpful": 15, "photos": null
//       }
//     }
//   }, {
//     "question_id": 252179, "question_body": "Est esse quos alias amet voluptatem.", "question_date": 1595828810804, "asker_name": "Alda.Wisozk", "question_helpfu
// lness" : 2, "reported" : false, "answers" : { "492245" : {"id" : 492245, "body" : "Voluptatem quis enim quo et.", "date" : 1595658716988, "answerer_name" : "Evie.Hilll21", "reported" : false, "helpful"
//       : 19, "photos": null
//   }, "492246" : {
//     "id": 492246, "body": "Quas error earum ut sit.", "date": 1615842135302, "answerer_name": "Chelsea_Stiedemann3", "reported": false, "helpful": 17, "photos":
//       null
//   }, "492247" : {
//     "id": 492247, "body": "Nobis maiores aut eos earum vitae voluptate.", "date": 1608341507976, "answerer_name": "Geoffrey.Kertzmann18", "reported": false, "helpful": 16, "photos"
//       : null
//   } }}]}
// (1 row)

// Time: 9.581 ms