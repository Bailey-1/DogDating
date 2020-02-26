CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS accounts;
CREATE TYPE gender AS ENUM ('Male', 'Female');
CREATE TYPE kennelclubmembership AS ENUM ('Affiliate', 'Associate', 'Member', 'None');
CREATE TABLE IF NOT EXISTS accounts (
  acc_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  acc_createTime timestamp DEFAULT now(),
  acc_kennelclubmembership kennelclubmembership DEFAULT 'None',
  acc_name TEXT
);
CREATE TABLE IF NOT EXISTS profiles (
  pro_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  pro_name TEXT DEFAULT 'NULL',
  pro_location TEXT DEFAULT 'NULL',
  pro_birthday TEXT DEFAULT 'NULL',
  pro_gender gender DEFAULT 'Male',
  pro_breed TEXT DEFAULT 'NULL',
  pro_aboutme TEXT DEFAULT 'NULL',
  pro_likes TEXT DEFAULT 'NULL',
  pro_dislikes TEXT DEFAULT 'NULL',
  acc_id uuid REFERENCES accounts(acc_id),
  pro_time timestamp DEFAULT now()
);  
CREATE TABLE IF NOT EXISTS images (
  img_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  img_ext TEXT,
  img_desc TEXT,
  img_time timestamp DEFAULT now(),
  img_profilePic bool DEFAULT false,
  pro_id uuid REFERENCES profiles(pro_id)
);

CREATE TABLE IF NOT EXISTS messages (
  msg_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  msg_sender uuid REFERENCES profiles(pro_id),
  msg_reciever uuid REFERENCES profiles(pro_id),
  msg_content TEXT,
  msg_time timestamp DEFAULT now()
);

INSERT INTO accounts (acc_id, acc_name, acc_kennelClubMembership)
VALUES
  (
    'cee3a7e6-5339-11ea-8d77-2e728ce88125',
    'Tim',
    'Associate'
  ),
  (
    'cee3aaa2-5339-11ea-8d77-2e728ce88125',
    'Bob',
    'Associate'
  ),
  (
    '37238d27-9534-4153-ad22-8c36e0353f04',
    'Dee',
    'None'
  ),
  (
    'fcec6b32-478f-4c54-9c43-bd1226dec801',
    'Frank',
    'Member'
  ),
  (
    '1de1c66d-d996-4c4d-81d9-5627a8cee461',
    'Dennis',
    'None'
  ),
  (
    'e21df604-5339-11ea-8d77-2e728ce88125',
    'Mac',
    'Affiliate'
  ),
  (
    '61482c76-5652-4a7c-8be0-d923bcb55901',
    'Charlie',
    'Affiliate'
  );
  /* INSERT INTO profiles (pro_name, pro_location, pro_birthday, pro_breed, acc_id, pro_gender) VALUES
  ('timmy', 'Portsmouth', '10/20/2015', 'Pug', 'cee3a7e6-5339-11ea-8d77-2e728ce88125', 'Male'),
  ('name2', 'Portsmouth', '10/20/2015', 'Pug', 'e21df604-5339-11ea-8d77-2e728ce88125', 'Female'),
  ('name3', 'Portsmouth', '10/20/2015', 'Pug', 'cee3a7e6-5339-11ea-8d77-2e728ce88125', 'Male'); */
INSERT INTO profiles(
    acc_id,
    pro_name,
    pro_birthday,
    pro_gender,
    pro_breed,
    pro_location,
    pro_aboutme,
    pro_likes,
    pro_dislikes
  )
VALUES
  (
    'cee3a7e6-5339-11ea-8d77-2e728ce88125',
    'Benny',
    '1/1/2018',
    'Male',
    'Border Collie',
    'Portsmouth',
    'About Me',
    'Likes',
    'Dislikes'
  );
INSERT INTO profiles(
    acc_id,
    pro_name,
    pro_birthday,
    pro_gender,
    pro_breed,
    pro_location,
    pro_aboutme,
    pro_likes,
    pro_dislikes
  )
VALUES
  (
    'cee3aaa2-5339-11ea-8d77-2e728ce88125',
    'Anna',
    '11/13/2002',
    'Female',
    'German Shepard',
    'Southampton',
    'About Me',
    'Likes',
    'Dislikes'
  );
INSERT INTO profiles(
    acc_id,
    pro_name,
    pro_birthday,
    pro_gender,
    pro_breed,
    pro_location,
    pro_aboutme,
    pro_likes,
    pro_dislikes
  )
VALUES
  (
    'fcec6b32-478f-4c54-9c43-bd1226dec801',
    'Dave',
    '08/13/2013',
    'Male',
    'Poodle',
    'Portsmouth',
    'About Me',
    'Likes',
    'Dislikes'
  );
INSERT INTO profiles(
    acc_id,
    pro_name,
    pro_birthday,
    pro_gender,
    pro_breed,
    pro_location,
    pro_aboutme,
    pro_likes,
    pro_dislikes
  )
VALUES
  (
    'fcec6b32-478f-4c54-9c43-bd1226dec801',
    'Buster',
    '05/12/2007',
    'Male',
    'Great Dane',
    'Portsmouth',
    'About Me',
    'Likes',
    'Dislikes'
  );
INSERT INTO profiles(
    acc_id,
    pro_name,
    pro_birthday,
    pro_gender,
    pro_breed,
    pro_location,
    pro_aboutme,
    pro_likes,
    pro_dislikes
  )
VALUES
  (
    'cee3aaa2-5339-11ea-8d77-2e728ce88125',
    'Anne',
    '06/25/2009',
    'Female',
    'Great Dane',
    'Chichester',
    'About Me',
    'Likes',
    'Dislikes'
  );
INSERT INTO profiles(
    acc_id,
    pro_name,
    pro_birthday,
    pro_gender,
    pro_breed,
    pro_location,
    pro_aboutme,
    pro_likes,
    pro_dislikes
  )
VALUES
  (
    '61482c76-5652-4a7c-8be0-d923bcb55901',
    'Toby',
    '05/12/2012',
    'Male',
    'Labrador',
    'Chichester',
    'About Me',
    'Likes',
    'Dislikes'
  );
INSERT INTO profiles(
    acc_id,
    pro_name,
    pro_birthday,
    pro_gender,
    pro_breed,
    pro_location,
    pro_aboutme,
    pro_likes,
    pro_dislikes
  )
VALUES
  (
    '61482c76-5652-4a7c-8be0-d923bcb55901',
    'Tommie',
    '08/03/2014',
    'Male',
    'Husky',
    'Southsea',
    'About Me',
    'Likes',
    'Dislikes'
  );
INSERT INTO profiles(
    acc_id,
    pro_name,
    pro_birthday,
    pro_gender,
    pro_breed,
    pro_location,
    pro_aboutme,
    pro_likes,
    pro_dislikes
  )
VALUES
  (
    'fcec6b32-478f-4c54-9c43-bd1226dec801',
    'Brittany',
    '03/20/2016',
    'Female',
    'Golden Retriever',
    'Waterlooville',
    'About Me',
    'Likes',
    'Dislikes'
  );
INSERT INTO profiles(
    acc_id,
    pro_name,
    pro_birthday,
    pro_gender,
    pro_breed,
    pro_location,
    pro_aboutme,
    pro_likes,
    pro_dislikes
  )
VALUES
  (
    'cee3aaa2-5339-11ea-8d77-2e728ce88125',
    'Darsey',
    '06/07/2010',
    'Male',
    'Chihuahua',
    'Havant',
    'About Me',
    'Likes',
    'Dislikes'
  );
INSERT INTO profiles(
    acc_id,
    pro_name,
    pro_birthday,
    pro_gender,
    pro_breed,
    pro_location,
    pro_aboutme,
    pro_likes,
    pro_dislikes
  )
VALUES
  (
    'cee3aaa2-5339-11ea-8d77-2e728ce88125',
    'Dara',
    '07/20/2018',
    'Male',
    'Husky',
    'Havant',
    'About Me',
    'Likes',
    'Dislikes'
  );
INSERT INTO profiles(
    acc_id,
    pro_name,
    pro_birthday,
    pro_gender,
    pro_breed,
    pro_location,
    pro_aboutme,
    pro_likes,
    pro_dislikes
  )
VALUES
  (
    '1de1c66d-d996-4c4d-81d9-5627a8cee461',
    'Rosie',
    '06/29/2006',
    'Female',
    'French Bulldog',
    'Southsea',
    'About Me',
    'Likes',
    'Dislikes'
  );
INSERT INTO profiles(
    acc_id,
    pro_name,
    pro_birthday,
    pro_gender,
    pro_breed,
    pro_location,
    pro_aboutme,
    pro_likes,
    pro_dislikes
  )
VALUES
  (
    '1de1c66d-d996-4c4d-81d9-5627a8cee461',
    'Gordon',
    '08/09/2008',
    'Male',
    'Golden Retriever',
    'Fratton',
    'About Me',
    'Likes',
    'Dislikes'
  );
INSERT INTO profiles(
    acc_id,
    pro_name,
    pro_birthday,
    pro_gender,
    pro_breed,
    pro_location,
    pro_aboutme,
    pro_likes,
    pro_dislikes
  )
VALUES
  (
    'cee3aaa2-5339-11ea-8d77-2e728ce88125',
    'Emily',
    '08/22/2008',
    'Female',
    'Poodle',
    'Fratton',
    'About Me',
    'Likes',
    'Dislikes'
  );
INSERT INTO profiles(
    acc_id,
    pro_name,
    pro_birthday,
    pro_gender,
    pro_breed,
    pro_location,
    pro_aboutme,
    pro_likes,
    pro_dislikes
  )
VALUES
  (
    'cee3a7e6-5339-11ea-8d77-2e728ce88125',
    'Turd',
    '06/23/2000',
    'Female',
    'Poodle',
    'Southampton',
    'About Me',
    'Likes',
    'Dislikes'
  );
INSERT INTO profiles(
    acc_id,
    pro_name,
    pro_birthday,
    pro_gender,
    pro_breed,
    pro_location,
    pro_aboutme,
    pro_likes,
    pro_dislikes
  )
VALUES
  (
    '61482c76-5652-4a7c-8be0-d923bcb55901',
    'Melvyn',
    '05/05/2009',
    'Male',
    'Chow Chow',
    'Fareham',
    'About Me',
    'Likes',
    'Dislikes'
  );
INSERT INTO profiles(
    acc_id,
    pro_name,
    pro_birthday,
    pro_gender,
    pro_breed,
    pro_location,
    pro_aboutme,
    pro_likes,
    pro_dislikes
  )
VALUES
  (
    '61482c76-5652-4a7c-8be0-d923bcb55901',
    'Beth',
    '12/24/2017',
    'Female',
    'Boxer',
    'Waterlooville',
    'About Me',
    'Likes',
    'Dislikes'
  );
INSERT INTO profiles(
    acc_id,
    pro_name,
    pro_birthday,
    pro_gender,
    pro_breed,
    pro_location,
    pro_aboutme,
    pro_likes,
    pro_dislikes
  )
VALUES
  (
    '61482c76-5652-4a7c-8be0-d923bcb55901',
    'Tony',
    '12/08/2002',
    'Male',
    'Boxer',
    'Portsmouth',
    'About Me',
    'Likes',
    'Dislikes'
  );
INSERT INTO profiles(
    acc_id,
    pro_name,
    pro_birthday,
    pro_gender,
    pro_breed,
    pro_location,
    pro_aboutme,
    pro_likes,
    pro_dislikes
  )
VALUES
  (
    'cee3aaa2-5339-11ea-8d77-2e728ce88125',
    'Obama',
    '12/01/2014',
    'Male',
    'Chow Chow',
    'Fratton',
    'About Me',
    'Likes',
    'Dislikes'
  );
INSERT INTO profiles(
    acc_id,
    pro_name,
    pro_birthday,
    pro_gender,
    pro_breed,
    pro_location,
    pro_aboutme,
    pro_likes,
    pro_dislikes
  )
VALUES
  (
    '61482c76-5652-4a7c-8be0-d923bcb55901',
    'Alexandra',
    '05/21/2007',
    'Female',
    'Husky',
    'Gosport',
    'About Me',
    'Likes',
    'Dislikes'
  );
INSERT INTO profiles(
    acc_id,
    pro_name,
    pro_birthday,
    pro_gender,
    pro_breed,
    pro_location,
    pro_aboutme,
    pro_likes,
    pro_dislikes
  )
VALUES
  (
    '61482c76-5652-4a7c-8be0-d923bcb55901',
    'Gregory',
    '08/15/2014',
    'Male',
    'Chow Chow',
    'Fareham',
    'About Me',
    'Likes',
    'Dislikes'
  );
INSERT INTO profiles(
    acc_id,
    pro_name,
    pro_birthday,
    pro_gender,
    pro_breed,
    pro_location,
    pro_aboutme,
    pro_likes,
    pro_dislikes
  )
VALUES
  (
    'cee3a7e6-5339-11ea-8d77-2e728ce88125',
    'Ruth',
    '05/11/2005',
    'Female',
    'Border Collie',
    'Fareham',
    'About Me',
    'Likes',
    'Dislikes'
  );
INSERT INTO profiles(
    acc_id,
    pro_name,
    pro_birthday,
    pro_gender,
    pro_breed,
    pro_location,
    pro_aboutme,
    pro_likes,
    pro_dislikes
  )
VALUES
  (
    'cee3a7e6-5339-11ea-8d77-2e728ce88125',
    'Morgan',
    '10/07/2012',
    'Male',
    'Rottweiler',
    'Havant',
    'About Me',
    'Likes',
    'Dislikes'
  );
INSERT INTO profiles(
    acc_id,
    pro_name,
    pro_birthday,
    pro_gender,
    pro_breed,
    pro_location,
    pro_aboutme,
    pro_likes,
    pro_dislikes
  )
VALUES
  (
    'e21df604-5339-11ea-8d77-2e728ce88125',
    'Dennis Jr.',
    '07/20/2015',
    'Male',
    'Rottweiler',
    'Gosport',
    'About Me',
    'Likes',
    'Dislikes'
  );
INSERT INTO profiles(
    acc_id,
    pro_name,
    pro_birthday,
    pro_gender,
    pro_breed,
    pro_location,
    pro_aboutme,
    pro_likes,
    pro_dislikes
  )
VALUES
  (
    '1de1c66d-d996-4c4d-81d9-5627a8cee461',
    'Sophie',
    '06/06/2000',
    'Female',
    'Poodle',
    'Fareham',
    'About Me',
    'Likes',
    'Dislikes'
  );
INSERT INTO profiles(
    acc_id,
    pro_name,
    pro_birthday,
    pro_gender,
    pro_breed,
    pro_location,
    pro_aboutme,
    pro_likes,
    pro_dislikes
  )
VALUES
  (
    'cee3aaa2-5339-11ea-8d77-2e728ce88125',
    'Alice',
    '05/22/2015',
    'Female',
    'Chihuahua',
    'Southampton',
    'About Me',
    'Likes',
    'Dislikes'
  );