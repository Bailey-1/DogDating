'use strict';
const config = require('./config');
const Postgres = require('pg').Client;

const sql = new Postgres(config);
sql.connect();

sql.on('error', err => {
	console.error('SQL Fail', err);
	sql.end();
});

async function listProfiles() {
	const q = 'SELECT * FROM profiles;';
	const result = await sql.query(q);
	return result.rows;
}

async function getProfilesByAccountId(id) {
	console.log('id: ', id);
	const q = `SELECT * FROM profiles WHERE acc_id = '${id}';`;
	console.log(q);
	const result = await sql.query(q);
	return result.rows;
}

async function getProfileById(id) {
	console.log('pro_id: ', id);
	const q = `SELECT * FROM profiles WHERE pro_id = '${id}';`;
	console.log(q);
	const result = await sql.query(q);
	return result.rows;
}

async function getDiscoveryById(id) {
	let q = `SELECT pro_gender FROM profiles WHERE pro_id = '${id}'`;
	const userGender = await sql.query(q);
	console.log(userGender.rows[0].pro_gender);
	q = `SELECT * FROM profiles WHERE pro_gender != '${userGender.rows[0].pro_gender}' AND pro_id != '${id}'`;
	let result = await sql.query(q);
	return result;
}

module.exports = {
	listProfiles,
	getProfilesByAccountId,
	getProfileById,
	getDiscoveryById
};
