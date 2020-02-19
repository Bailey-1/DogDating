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

module.exports = {
	listProfiles
};
