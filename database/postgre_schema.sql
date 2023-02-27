--connect to Postgres CLI
-- psql postgres

-- read this sql file
-- \i ./database/postgre_schema.sql;

--CREATE DATABASE IF NOT EXISTS qanda;
-- connect DB
\c qanda;
-- create tables

CREATE TABLE IF NOT EXISTS questions(
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
FROM '/docker-entrypoint-initdb.d/questions.csv' DELIMITER ',' CSV HEADER;
--FROM '/Users/saikitJK/HackReactor/SDC/Questions-API/database/questions.csv' DELIMITER ',' CSV HEADER;


CREATE TABLE IF NOT EXISTS answers(
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
FROM '/docker-entrypoint-initdb.d/answers.csv' DELIMITER ',' CSV HEADER;
--FROM '/Users/saikitJK/HackReactor/SDC/Questions-API/database/answers.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE IF NOT EXISTS photos(
  PHOTO_ID SERIAL PRIMARY KEY NOT NULL,
  ANSWER_ID INTEGER REFERENCES ANSWERS(ANSWER_ID),
  PIC_URL TEXT NOT NULL
);
--Insert data
COPY photos (PHOTO_ID, ANSWER_ID, PIC_URL)
FROM '/docker-entrypoint-initdb.d/answers_photos.csv' DELIMITER ',' CSV HEADER;
--FROM '/Users/saikitJK/HackReactor/SDC/Questions-API/database/answers_photos.csv' DELIMITER ',' CSV HEADER;

-- set sequence
SELECT setval('questions_question_id_seq', COALESCE((SELECT MAX(question_id)+1 FROM questions), 1), false);
SELECT setval('answers_answer_id_seq', COALESCE((SELECT MAX(answer_id)+1 FROM answers), 1), false);
SELECT setval('photos_photo_id_seq', COALESCE((SELECT MAX(photo_id)+1 FROM photos), 1), false);

-- Create index for lookup values
-- Questions table
CREATE INDEX idx_product_id ON questions(product_id);
CREATE INDEX idx_question_id ON questions(question_id);
CREATE INDEX idx_question_submitted_date  ON questions(submitted_date);
CREATE INDEX idx_question_helpfulness ON questions (question_helpfulness);


-- Answers table
CREATE INDEX idx_answer_id ON answers(answer_id);
CREATE INDEX idx_question_fk ON answers (question_id);
CREATE INDEX idx_answer_submitted_date ON answers(submitted_date);
CREATE INDEX idx_answers_helpfulness ON answers (answer_helpfulness);

--Photos table
CREATE INDEX idx_photo_id ON photos(photo_id);
CREATE INDEX idx_answers_fk ON photos (answer_id);

--Permissions
GRANT ALL PRIVILEGES ON ALL TABLES in schema public to sdcuser;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO sdcuser;

--enable timeing
\timing