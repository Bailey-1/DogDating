CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS profiles;

CREATE TABLE IF NOT EXISTS profiles (
    id   uuid      DEFAULT uuid_generate_v4() PRIMARY KEY,
    dogName TEXT
);

INSERT INTO profiles (dogName) VALUES
( 'name1' ),
( 'name2' ),
( 'name3' );
