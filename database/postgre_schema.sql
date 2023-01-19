-- read this sql file
-- \i ./database/postgre_schema.sql;

DROP DATABASE IF EXISTS qanda;
CREATE DATABASE qanda;
-- connect DB
\c qanda;
-- create tables

CREATE TABLE questions(
  QUESTION_ID SERIAL PRIMARY KEY NOT NULL,
  PRODUCT_ID INT NOT NULL,
  QUESTION_BODY TEXT NOT NULL,
  SUBMITTED_DATE BIGINT NOT NULL ,
  USERNAME TEXT NOT NULL,
  EMAIL TEXT,
  REPORTED BOOLEAN,
  QUESTION_HELPFULNESS INT DEFAULT 0
);

--Insert data
--https://www.postgresql.org/docs/current/sql-copy.html
COPY questions (QUESTION_ID, PRODUCT_ID, QUESTION_BODY,SUBMITTED_DATE,USERNAME,EMAIL,REPORTED,QUESTION_HELPFULNESS)
FROM '/Users/saikitJK/HackReactor/SDC/Questions-API/database/questions.csv' DELIMITER ',' CSV HEADER;


CREATE TABLE answers(
  ANSWER_ID SERIAL PRIMARY KEY NOT NULL,
  QUESTION_ID INTEGER REFERENCES QUESTIONS(QUESTION_ID),
  ANSWER_BODY TEXT NOT NULL,
  SUBMITTED_DATE BIGINT NOT NULL,
  USERNAME TEXT NOT NULL,
  EMAIL TEXT,
  REPORTED BOOLEAN,
  ANSWER_HELPFULNESS INT DEFAULT 0
);
--Insert data
COPY answers (ANSWER_ID, QUESTION_ID, ANSWER_BODY, SUBMITTED_DATE, USERNAME, EMAIL,REPORTED, ANSWER_HELPFULNESS)
FROM '/Users/saikitJK/HackReactor/SDC/Questions-API/database/answers.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE photos(
  PHOTO_ID SERIAL PRIMARY KEY NOT NULL,
  ANSWER_ID INTEGER REFERENCES ANSWERS(ANSWER_ID),
  PIC_URL TEXT NOT NULL
);
--Insert data
COPY photos (PHOTO_ID, ANSWER_ID, PIC_URL)
FROM '/Users/saikitJK/HackReactor/SDC/Questions-API/database/answers_photos.csv' DELIMITER ',' CSV HEADER;

-- set sequence
SELECT setval('questions_question_id_seq', COALESCE((SELECT MAX(question_id)+1 FROM questions), 1), false);
SELECT setval('answers_answer_id_seq', COALESCE((SELECT MAX(answer_id)+1 FROM answers), 1), false);
SELECT setval('photos_photo_id_seq', COALESCE((SELECT MAX(photo_id)+1 FROM photos), 1), false);