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
    pro_id,
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
    '3abb409c-72c2-44fe-86c9-71f587ac854a',
    'cee3a7e6-5339-11ea-8d77-2e728ce88125',
    'Benny',
    '1/1/2018',
    'Male',
    'Border Collie',
    'Portsmouth',
    'About Me',
    'Likes',
    'Dislikes'
  ),
  (
    'f441795c-eb2c-4d0b-b466-f429f37ff171',
    'cee3aaa2-5339-11ea-8d77-2e728ce88125',
    'Anna',
    '11/13/2002',
    'Female',
    'German Shepard',
    'Southampton',
    'About Me',
    'Likes',
    'Dislikes'
  ),
  (
    '08295b26-51ed-47a9-b2f6-9c34d8751fcb',
    'fcec6b32-478f-4c54-9c43-bd1226dec801',
    'Dave',
    '08/13/2013',
    'Male',
    'Poodle',
    'Portsmouth',
    'About Me',
    'Likes',
    'Dislikes'
  ),
  (
    '82b75703-3336-4846-bdd3-72ee005d12b5',
    'fcec6b32-478f-4c54-9c43-bd1226dec801',
    'Buster',
    '05/12/2007',
    'Male',
    'Border Collie',
    'Portsmouth',
    'About Me',
    'Likes',
    'Dislikes'
  ),
  (
    '6345ee56-354b-486e-a32f-6508ef818cba',
    'cee3aaa2-5339-11ea-8d77-2e728ce88125',
    'Anne',
    '06/25/2009',
    'Female',
    'Great Dane',
    'Chichester',
    'About Me',
    'Likes',
    'Dislikes'
  ),
  (
    'eb28ba6d-42e7-4d79-97f3-4f39b8b02630',
    '61482c76-5652-4a7c-8be0-d923bcb55901',
    'Toby',
    '05/12/2012',
    'Male',
    'Labrador',
    'Chichester',
    'About Me',
    'Likes',
    'Dislikes'
  ),
  (
    'c0648d95-e130-4ccb-810c-cdb8c66cdf6a',
    '61482c76-5652-4a7c-8be0-d923bcb55901',
    'Tommie',
    '08/03/2014',
    'Male',
    'Husky',
    'Southsea',
    'About Me',
    'Likes',
    'Dislikes'
  ),
  (
    '725e7d2e-cef3-40df-83b9-f298751e48ef',
    'fcec6b32-478f-4c54-9c43-bd1226dec801',
    'Brittany',
    '03/20/2016',
    'Female',
    'Golden Retriever',
    'Waterlooville',
    'About Me',
    'Likes',
    'Dislikes'
  ),
  (
    '14e8ea16-d880-4557-a059-66924e720b0f',
    'cee3aaa2-5339-11ea-8d77-2e728ce88125',
    'Darsey',
    '06/07/2010',
    'Male',
    'Chihuahua',
    'Havant',
    'About Me',
    'Likes',
    'Dislikes'
  ),
  (
    'cf2f16ff-4d29-468d-98cd-31a82120124b',
    'cee3aaa2-5339-11ea-8d77-2e728ce88125',
    'Dara',
    '07/20/2018',
    'Male',
    'Husky',
    'Havant',
    'About Me',
    'Likes',
    'Dislikes'
  ),
  (
    'ade2960a-830a-45c7-b993-91b3a63202ce',
    '1de1c66d-d996-4c4d-81d9-5627a8cee461',
    'Rosie',
    '06/29/2006',
    'Female',
    'French Bulldog',
    'Southsea',
    'About Me',
    'Likes',
    'Dislikes'
  ),
  (
    'e9d31b20-c65b-4adf-a846-719a5050a169',
    '1de1c66d-d996-4c4d-81d9-5627a8cee461',
    'Gordon',
    '08/09/2008',
    'Male',
    'Golden Retriever',
    'Fratton',
    'About Me',
    'Likes',
    'Dislikes'
  ),
  (
    'f6baa773-2444-40fa-b2b5-38cc56b328d3',
    'cee3aaa2-5339-11ea-8d77-2e728ce88125',
    'Emily',
    '08/22/2008',
    'Female',
    'Poodle',
    'Fratton',
    'About Me',
    'Likes',
    'Dislikes'
  ),
  (
    '60776534-54c6-47b9-9c92-b796e0a4554b',
    'cee3a7e6-5339-11ea-8d77-2e728ce88125',
    'Turd',
    '06/23/2000',
    'Female',
    'Poodle',
    'Southampton',
    'About Me',
    'Likes',
    'Dislikes'
  ),
  (
    'ee4df16e-13a5-4367-a626-742e307ce39f',
    '61482c76-5652-4a7c-8be0-d923bcb55901',
    'Melvyn',
    '05/05/2009',
    'Male',
    'Chow Chow',
    'Fareham',
    'About Me',
    'Likes',
    'Dislikes'
  ),
  (
    '2be06221-54df-43a5-9475-71cef78c9e68',
    '61482c76-5652-4a7c-8be0-d923bcb55901',
    'Beth',
    '12/24/2017',
    'Female',
    'Boxer',
    'Waterlooville',
    'About Me',
    'Likes',
    'Dislikes'
  ),
  (
    '8fe2f73d-2b41-4528-ac4a-1108c2c90255',
    '61482c76-5652-4a7c-8be0-d923bcb55901',
    'Tony',
    '12/08/2002',
    'Male',
    'Boxer',
    'Portsmouth',
    'About Me',
    'Likes',
    'Dislikes'
  ),
  (
    'dc9fc973-9bdb-4c7d-a3b7-c6ab4755e114',
    'cee3aaa2-5339-11ea-8d77-2e728ce88125',
    'Obama',
    '12/01/2014',
    'Male',
    'Chow Chow',
    'Fratton',
    'About Me',
    'Likes',
    'Dislikes'
  ),
  (
    'ae80b48e-6220-4f37-a02d-fc510a65a137',
    '61482c76-5652-4a7c-8be0-d923bcb55901',
    'Alexandra',
    '05/21/2007',
    'Female',
    'Husky',
    'Gosport',
    'About Me',
    'Likes',
    'Dislikes'
  ),
  (
    '53e22488-6389-455d-afbc-62803c523fc3',
    '61482c76-5652-4a7c-8be0-d923bcb55901',
    'Gregory',
    '08/15/2014',
    'Male',
    'Chow Chow',
    'Fareham',
    'About Me',
    'Likes',
    'Dislikes'
  ),
  (
    '9cc6db1c-48ca-4ac9-ba72-eedfafa01a4b',
    'cee3a7e6-5339-11ea-8d77-2e728ce88125',
    'Ruth',
    '05/11/2005',
    'Female',
    'Border Collie',
    'Fareham',
    'About Me',
    'Likes',
    'Dislikes'
  ),
  (
    '0ef3bc3f-e316-41d5-813f-e54afe509286',
    'cee3a7e6-5339-11ea-8d77-2e728ce88125',
    'Terry',
    '10/07/2012',
    'Male',
    'Terrier',
    'Havant',
    'About Me',
    'Likes',
    'Dislikes'
  ),
  (
    '961e345f-705b-4b92-b8f2-66ffb97142b5',
    'e21df604-5339-11ea-8d77-2e728ce88125',
    'Dennis Jr.',
    '07/20/2015',
    'Male',
    'Rottweiler',
    'Gosport',
    'About Me',
    'Likes',
    'Dislikes'
  ),
  (
    'a0382e82-e794-44d7-bf4d-e6f031e7b4d9',
    '1de1c66d-d996-4c4d-81d9-5627a8cee461',
    'Sophie',
    '06/06/2000',
    'Female',
    'Poodle',
    'Fareham',
    'About Me',
    'Likes',
    'Dislikes'
  ),
  (
    '27293321-1f7b-4b02-bb7e-7601de0045b6',
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
  
  -- INSERT INTO images (img_id, img_ext, img_desc, img_profilepic, pro_id) values 
  -- (
  --   '18f24932-3ce8-4bda-80a5-50537cab4ce4',
  --   'jpeg', 
  --   'hello world',
  --   'True', 
  --   '3abb409c-72c2-44fe-86c9-71f587ac854a'
  -- ),
  -- (
  --   '449bbfdf-5e09-4b01-b019-f9401dbe5dc6',
  --   'jpeg', 
  --   'hello world',
  --   'True', 
  --   'f441795c-eb2c-4d0b-b466-f429f37ff171'
  -- ),
  -- (
  --   '40a68623-29e6-49a8-b688-7c82e445cc32',
  --   'jpeg', 
  --   'hello world',
  --   'True', 
  --   '08295b26-51ed-47a9-b2f6-9c34d8751fcb'
  -- ),
  -- (
  --   'a0d3e3c5-ca35-4b62-9f43-36ad3a980802',
  --   'jpeg', 
  --   'hello world',
  --   'True',  
  --   '2be06221-54df-43a5-9475-71cef78c9e68'
  -- );