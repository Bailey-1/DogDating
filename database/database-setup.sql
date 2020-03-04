CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS accounts;

CREATE TYPE sex AS ENUM ('Male', 'Female');
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
  pro_sex sex DEFAULT 'Male',
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
  /* INSERT INTO profiles (pro_name, pro_location, pro_birthday, pro_breed, acc_id, pro_sex) VALUES
  ('timmy', 'Portsmouth', '10/20/2015', 'Pug', 'cee3a7e6-5339-11ea-8d77-2e728ce88125', 'Male'),
  ('name2', 'Portsmouth', '10/20/2015', 'Pug', 'e21df604-5339-11ea-8d77-2e728ce88125', 'Female'),
  ('name3', 'Portsmouth', '10/20/2015', 'Pug', 'cee3a7e6-5339-11ea-8d77-2e728ce88125', 'Male'); */
INSERT INTO profiles (pro_id, pro_name, pro_location, pro_birthday, pro_sex, pro_breed, pro_aboutme, pro_likes, pro_dislikes, acc_id, pro_time) VALUES ('60776534-54c6-47b9-9c92-b796e0a4554b', 'Turd', 'Southampton', '2000-11-14', 'Female', 'Poodle', 'About Me', 'Likes', 'Dislikes', 'cee3a7e6-5339-11ea-8d77-2e728ce88125', '2020-03-03 20:24:23.661786');
INSERT INTO profiles (pro_id, pro_name, pro_location, pro_birthday, pro_sex, pro_breed, pro_aboutme, pro_likes, pro_dislikes, acc_id, pro_time) VALUES ('8fe2f73d-2b41-4528-ac4a-1108c2c90255', 'Tony', 'Portsmouth', '2002-11-13', 'Male', 'Boxer', 'About Me', 'Likes', 'Dislikes', '61482c76-5652-4a7c-8be0-d923bcb55901', '2020-03-03 20:24:23.661786');
INSERT INTO profiles (pro_id, pro_name, pro_location, pro_birthday, pro_sex, pro_breed, pro_aboutme, pro_likes, pro_dislikes, acc_id, pro_time) VALUES ('f441795c-eb2c-4d0b-b466-f429f37ff171', 'Anna', 'Southampton', '2002-12-25', 'Female', 'German Shepard', 'About Me', 'Likes', 'Dislikes', 'cee3aaa2-5339-11ea-8d77-2e728ce88125', '2020-03-03 20:24:23.661786');
INSERT INTO profiles (pro_id, pro_name, pro_location, pro_birthday, pro_sex, pro_breed, pro_aboutme, pro_likes, pro_dislikes, acc_id, pro_time) VALUES ('9cc6db1c-48ca-4ac9-ba72-eedfafa01a4b', 'Ruth', 'Fareham', '2005-09-03', 'Female', 'Border Collie', 'About Me', 'Likes', 'Dislikes', 'cee3a7e6-5339-11ea-8d77-2e728ce88125', '2020-03-03 20:24:23.661786');
INSERT INTO profiles (pro_id, pro_name, pro_location, pro_birthday, pro_sex, pro_breed, pro_aboutme, pro_likes, pro_dislikes, acc_id, pro_time) VALUES ('82b75703-3336-4846-bdd3-72ee005d12b5', 'Buster', 'Portsmouth', '2007-11-20', 'Male', 'Border Collie', 'About Me', 'Likes', 'Dislikes', 'fcec6b32-478f-4c54-9c43-bd1226dec801', '2020-03-03 20:24:23.661786');
INSERT INTO profiles (pro_id, pro_name, pro_location, pro_birthday, pro_sex, pro_breed, pro_aboutme, pro_likes, pro_dislikes, acc_id, pro_time) VALUES ('ee4df16e-13a5-4367-a626-742e307ce39f', 'Melvyn', 'Fareham', '2009-06-26', 'Male', 'Chow Chow', 'About Me', 'Likes', 'Dislikes', '61482c76-5652-4a7c-8be0-d923bcb55901', '2020-03-03 20:24:23.661786');
INSERT INTO profiles (pro_id, pro_name, pro_location, pro_birthday, pro_sex, pro_breed, pro_aboutme, pro_likes, pro_dislikes, acc_id, pro_time) VALUES ('6345ee56-354b-486e-a32f-6508ef818cba', 'Anne', 'Chichester', '2009-08-17', 'Female', 'Great Dane', 'About Me', 'Likes', 'Dislikes', 'cee3aaa2-5339-11ea-8d77-2e728ce88125', '2020-03-03 20:24:23.661786');
INSERT INTO profiles (pro_id, pro_name, pro_location, pro_birthday, pro_sex, pro_breed, pro_aboutme, pro_likes, pro_dislikes, acc_id, pro_time) VALUES ('14e8ea16-d880-4557-a059-66924e720b0f', 'Darsey', 'Havant', '2010-08-19', 'Male', 'Chihuahua', 'About Me', 'Likes', 'Dislikes', 'cee3aaa2-5339-11ea-8d77-2e728ce88125', '2020-03-03 20:24:23.661786');
INSERT INTO profiles (pro_id, pro_name, pro_location, pro_birthday, pro_sex, pro_breed, pro_aboutme, pro_likes, pro_dislikes, acc_id, pro_time) VALUES ('e9d31b20-c65b-4adf-a846-719a5050a169', 'Gordon', 'Fratton', '2011-01-18', 'Male', 'Golden Retriever', 'About Me', 'Likes', 'Dislikes', '1de1c66d-d996-4c4d-81d9-5627a8cee461', '2020-03-03 20:24:23.661786');
INSERT INTO profiles (pro_id, pro_name, pro_location, pro_birthday, pro_sex, pro_breed, pro_aboutme, pro_likes, pro_dislikes, acc_id, pro_time) VALUES ('0ef3bc3f-e316-41d5-813f-e54afe509286', 'Terry', 'Havant', '2012-10-07', 'Male', 'Terrier', 'About Me', 'Likes', 'Dislikes', 'cee3a7e6-5339-11ea-8d77-2e728ce88125', '2020-03-03 20:24:23.661786');
INSERT INTO profiles (pro_id, pro_name, pro_location, pro_birthday, pro_sex, pro_breed, pro_aboutme, pro_likes, pro_dislikes, acc_id, pro_time) VALUES ('eb28ba6d-42e7-4d79-97f3-4f39b8b02630', 'Toby', 'Chichester', '2012-12-10', 'Male', 'Labrador', 'About Me', 'Likes', 'Dislikes', '61482c76-5652-4a7c-8be0-d923bcb55901', '2020-03-03 20:24:23.661786');
INSERT INTO profiles (pro_id, pro_name, pro_location, pro_birthday, pro_sex, pro_breed, pro_aboutme, pro_likes, pro_dislikes, acc_id, pro_time) VALUES ('ae80b48e-6220-4f37-a02d-fc510a65a137', 'Alexandra', 'Gosport', '2013-02-21', 'Female', 'Husky', 'About Me', 'Likes', 'Dislikes', '61482c76-5652-4a7c-8be0-d923bcb55901', '2020-03-03 20:24:23.661786');
INSERT INTO profiles (pro_id, pro_name, pro_location, pro_birthday, pro_sex, pro_breed, pro_aboutme, pro_likes, pro_dislikes, acc_id, pro_time) VALUES ('08295b26-51ed-47a9-b2f6-9c34d8751fcb', 'Dave', 'Portsmouth', '2013-07-10', 'Male', 'Poodle', 'About Me', 'Likes', 'Dislikes', 'fcec6b32-478f-4c54-9c43-bd1226dec801', '2020-03-03 20:24:23.661786');
INSERT INTO profiles (pro_id, pro_name, pro_location, pro_birthday, pro_sex, pro_breed, pro_aboutme, pro_likes, pro_dislikes, acc_id, pro_time) VALUES ('c0648d95-e130-4ccb-810c-cdb8c66cdf6a', 'Tommie', 'Southsea', '2014-03-10', 'Male', 'Husky', 'About Me', 'Likes', 'Dislikes', '61482c76-5652-4a7c-8be0-d923bcb55901', '2020-03-03 20:24:23.661786');
INSERT INTO profiles (pro_id, pro_name, pro_location, pro_birthday, pro_sex, pro_breed, pro_aboutme, pro_likes, pro_dislikes, acc_id, pro_time) VALUES ('53e22488-6389-455d-afbc-62803c523fc3', 'Gregory', 'Fareham', '2014-08-09', 'Male', 'Chow Chow', 'About Me', 'Likes', 'Dislikes', '61482c76-5652-4a7c-8be0-d923bcb55901', '2020-03-03 20:24:23.661786');
INSERT INTO profiles (pro_id, pro_name, pro_location, pro_birthday, pro_sex, pro_breed, pro_aboutme, pro_likes, pro_dislikes, acc_id, pro_time) VALUES ('dc9fc973-9bdb-4c7d-a3b7-c6ab4755e114', 'Obama', 'Fratton', '2014-11-19', 'Male', 'Chow Chow', 'About Me', 'Likes', 'Dislikes', 'cee3aaa2-5339-11ea-8d77-2e728ce88125', '2020-03-03 20:24:23.661786');
INSERT INTO profiles (pro_id, pro_name, pro_location, pro_birthday, pro_sex, pro_breed, pro_aboutme, pro_likes, pro_dislikes, acc_id, pro_time) VALUES ('f6baa773-2444-40fa-b2b5-38cc56b328d3', 'Emily', 'Fratton', '2015-04-13', 'Female', 'Poodle', 'About Me', 'Likes', 'Dislikes', 'cee3aaa2-5339-11ea-8d77-2e728ce88125', '2020-03-03 20:24:23.661786');
INSERT INTO profiles (pro_id, pro_name, pro_location, pro_birthday, pro_sex, pro_breed, pro_aboutme, pro_likes, pro_dislikes, acc_id, pro_time) VALUES ('961e345f-705b-4b92-b8f2-66ffb97142b5', 'Dennis Jr.', 'Gosport', '2015-05-04', 'Male', 'Rottweiler', 'About Me', 'Likes', 'Dislikes', 'e21df604-5339-11ea-8d77-2e728ce88125', '2020-03-03 20:24:23.661786');
INSERT INTO profiles (pro_id, pro_name, pro_location, pro_birthday, pro_sex, pro_breed, pro_aboutme, pro_likes, pro_dislikes, acc_id, pro_time) VALUES ('27293321-1f7b-4b02-bb7e-7601de0045b6', 'Alice', 'Southampton', '2015-06-19', 'Female', 'Chihuahua', 'About Me', 'Likes', 'Dislikes', 'cee3aaa2-5339-11ea-8d77-2e728ce88125', '2020-03-03 20:24:23.661786');
INSERT INTO profiles (pro_id, pro_name, pro_location, pro_birthday, pro_sex, pro_breed, pro_aboutme, pro_likes, pro_dislikes, acc_id, pro_time) VALUES ('a0382e82-e794-44d7-bf4d-e6f031e7b4d9', 'Sophie', 'Fareham', '2016-07-07', 'Female', 'Poodle', 'About Me', 'Likes', 'Dislikes', '1de1c66d-d996-4c4d-81d9-5627a8cee461', '2020-03-03 20:24:23.661786');
INSERT INTO profiles (pro_id, pro_name, pro_location, pro_birthday, pro_sex, pro_breed, pro_aboutme, pro_likes, pro_dislikes, acc_id, pro_time) VALUES ('725e7d2e-cef3-40df-83b9-f298751e48ef', 'Brittany', 'Waterlooville', '2016-10-10', 'Female', 'Golden Retriever', 'About Me', 'Likes', 'Dislikes', 'fcec6b32-478f-4c54-9c43-bd1226dec801', '2020-03-03 20:24:23.661786');
INSERT INTO profiles (pro_id, pro_name, pro_location, pro_birthday, pro_sex, pro_breed, pro_aboutme, pro_likes, pro_dislikes, acc_id, pro_time) VALUES ('2be06221-54df-43a5-9475-71cef78c9e68', 'Beth', 'Waterlooville', '2017-10-10', 'Female', 'Boxer', 'About Me', 'Likes', 'Dislikes', '61482c76-5652-4a7c-8be0-d923bcb55901', '2020-03-03 20:24:23.661786');
INSERT INTO profiles (pro_id, pro_name, pro_location, pro_birthday, pro_sex, pro_breed, pro_aboutme, pro_likes, pro_dislikes, acc_id, pro_time) VALUES ('ade2960a-830a-45c7-b993-91b3a63202ce', 'Rosie', 'Southsea', '2017-11-14', 'Female', 'French Bulldog', 'About Me', 'Likes', 'Dislikes', '1de1c66d-d996-4c4d-81d9-5627a8cee461', '2020-03-03 20:24:23.661786');
INSERT INTO profiles (pro_id, pro_name, pro_location, pro_birthday, pro_sex, pro_breed, pro_aboutme, pro_likes, pro_dislikes, acc_id, pro_time) VALUES ('3abb409c-72c2-44fe-86c9-71f587ac854a', 'Benny', 'Portsmouth', '2018-01-01', 'Male', 'Border Collie', 'About Me', 'Likes', 'Dislikes', 'cee3a7e6-5339-11ea-8d77-2e728ce88125', '2020-03-03 20:24:23.661786');
INSERT INTO profiles (pro_id, pro_name, pro_location, pro_birthday, pro_sex, pro_breed, pro_aboutme, pro_likes, pro_dislikes, acc_id, pro_time) VALUES ('cf2f16ff-4d29-468d-98cd-31a82120124b', 'Dara', 'Havant', '2018-07-25', 'Male', 'Husky', 'About Me', 'Likes', 'Dislikes', 'cee3aaa2-5339-11ea-8d77-2e728ce88125', '2020-03-03 20:24:23.661786');
  
INSERT INTO messages (msg_id, msg_sender, msg_reciever, msg_content, msg_time) VALUES ('345690a4-7247-4c97-9d4b-576f95e12602', '3abb409c-72c2-44fe-86c9-71f587ac854a', '60776534-54c6-47b9-9c92-b796e0a4554b', 'Hello. How are you?
', '2020-02-28 12:57:53.021294');
INSERT INTO messages (msg_id, msg_sender, msg_reciever, msg_content, msg_time) VALUES ('7762c91c-7cb2-4d7a-a66a-ef8fbccb465e', '3abb409c-72c2-44fe-86c9-71f587ac854a', '9cc6db1c-48ca-4ac9-ba72-eedfafa01a4b', 'Hello. Your dog is so cute.', '2020-02-28 12:58:30.711100');
INSERT INTO messages (msg_id, msg_sender, msg_reciever, msg_content, msg_time) VALUES ('cad8f5c0-13c6-44fa-b436-5122588b7b4c', '9cc6db1c-48ca-4ac9-ba72-eedfafa01a4b', '3abb409c-72c2-44fe-86c9-71f587ac854a', 'Hey benny. Thanks
', '2020-02-28 12:59:14.017327');
INSERT INTO messages (msg_id, msg_sender, msg_reciever, msg_content, msg_time) VALUES ('285f4ee2-78e8-43b0-a573-59256c7844fd', '9cc6db1c-48ca-4ac9-ba72-eedfafa01a4b', '3abb409c-72c2-44fe-86c9-71f587ac854a', 'Do you like my dog?
', '2020-02-28 12:59:20.783173');
INSERT INTO messages (msg_id, msg_sender, msg_reciever, msg_content, msg_time) VALUES ('9ec8ea44-2b4f-4e3e-89fa-6ce74209c3c6', '9cc6db1c-48ca-4ac9-ba72-eedfafa01a4b', '0ef3bc3f-e316-41d5-813f-e54afe509286', 'Hi morgan!', '2020-02-28 12:59:34.256697');
INSERT INTO messages (msg_id, msg_sender, msg_reciever, msg_content, msg_time) VALUES ('18bb0962-435b-41d3-b907-de67d5227c00', '9cc6db1c-48ca-4ac9-ba72-eedfafa01a4b', '0ef3bc3f-e316-41d5-813f-e54afe509286', 'How are you?
', '2020-02-28 12:59:43.150707');
INSERT INTO messages (msg_id, msg_sender, msg_reciever, msg_content, msg_time) VALUES ('7f9486cf-eb0f-4da9-a955-bb1bce763b8e', '60776534-54c6-47b9-9c92-b796e0a4554b', '0ef3bc3f-e316-41d5-813f-e54afe509286', 'Hey! I like your dog.
', '2020-02-28 13:00:55.251981');
INSERT INTO messages (msg_id, msg_sender, msg_reciever, msg_content, msg_time) VALUES ('7c5dd438-a1f3-4384-b9a7-33bc116e6d7f', '60776534-54c6-47b9-9c92-b796e0a4554b', '3abb409c-72c2-44fe-86c9-71f587ac854a', 'Im good thanks. how are you 😀', '2020-02-28 13:01:18.742846');
INSERT INTO messages (msg_id, msg_sender, msg_reciever, msg_content, msg_time) VALUES ('e0ef5c9c-3c64-441b-b384-3cea91fde73f', '0ef3bc3f-e316-41d5-813f-e54afe509286', '60776534-54c6-47b9-9c92-b796e0a4554b', 'thanks. i think your dog is cool as well.
', '2020-02-28 13:03:42.861966');
INSERT INTO messages (msg_id, msg_sender, msg_reciever, msg_content, msg_time) VALUES ('cd21de21-72ca-4f92-98a0-9f5800a0c700', '0ef3bc3f-e316-41d5-813f-e54afe509286', '9cc6db1c-48ca-4ac9-ba72-eedfafa01a4b', 'Hey ruth
', '2020-02-28 13:03:52.309370');

INSERT INTO images (img_id, img_ext, img_desc, img_time, img_profilepic, pro_id) VALUES ('94904b91-1eab-4b15-84e2-1ebf70271721', 'jpeg', 'Me outside', '2020-03-03 20:24:51.735910', true, '9cc6db1c-48ca-4ac9-ba72-eedfafa01a4b');
INSERT INTO images (img_id, img_ext, img_desc, img_time, img_profilepic, pro_id) VALUES ('5e930020-d08a-41fc-94b7-2a43f84db13c', 'jpeg', 'Me also outside', '2020-03-03 20:25:13.421886', true, '3abb409c-72c2-44fe-86c9-71f587ac854a');
INSERT INTO images (img_id, img_ext, img_desc, img_time, img_profilepic, pro_id) VALUES ('9980ff9d-a672-4ec6-9784-6472c012f3a3', 'jpeg', '', '2020-03-03 20:25:27.662980', false, '0ef3bc3f-e316-41d5-813f-e54afe509286');
INSERT INTO images (img_id, img_ext, img_desc, img_time, img_profilepic, pro_id) VALUES ('14995212-9920-4e5a-8ae4-1fe25b327bc2', 'jpeg', '', '2020-03-03 20:25:35.375190', true, '0ef3bc3f-e316-41d5-813f-e54afe509286');
INSERT INTO images (img_id, img_ext, img_desc, img_time, img_profilepic, pro_id) VALUES ('92bf5920-39b5-4c1d-bd80-9ace5bc9bedc', 'jpeg', '', '2020-03-03 20:25:48.354335', false, '60776534-54c6-47b9-9c92-b796e0a4554b');
INSERT INTO images (img_id, img_ext, img_desc, img_time, img_profilepic, pro_id) VALUES ('3af778e8-28cb-4f62-ae98-81a6cb48cd45', 'jpeg', '', '2020-03-03 20:25:52.820143', true, '60776534-54c6-47b9-9c92-b796e0a4554b');
INSERT INTO images (img_id, img_ext, img_desc, img_time, img_profilepic, pro_id) VALUES ('18f24932-3ce8-4bda-80a5-50537cab4ce4', 'jpeg', 'Me looking cute', '2020-03-03 20:31:50.968894', true, '82b75703-3336-4846-bdd3-72ee005d12b5');
INSERT INTO images (img_id, img_ext, img_desc, img_time, img_profilepic, pro_id) VALUES ('7594aaa9-3229-4b11-a26f-1b5fffe04b1f', 'jpeg', 'husky', '2020-03-03 20:33:16.395339', true, 'cf2f16ff-4d29-468d-98cd-31a82120124b');
INSERT INTO images (img_id, img_ext, img_desc, img_time, img_profilepic, pro_id) VALUES ('d16861e4-4dd8-423b-b1c1-3e56febad68c', 'jpeg', 'husky 2', '2020-03-03 20:34:10.731383', true, 'ae80b48e-6220-4f37-a02d-fc510a65a137');