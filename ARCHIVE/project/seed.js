// seed.js
const fs = require('fs');
const path = require('path');
const db = require('./models/db');

function runSQLFile(filename) {
  const filePath = path.join(__dirname, filename);
  const sql = fs.readFileSync(filePath, 'utf-8');
  try {
    db.exec(sql);
    console.log(`Executed: ${filename}`);
  } catch (err) {
    console.error(`Error in ${filename}:`, err.message);
  }
}

console.log('Seeding database...');
runSQLFile('drop_tables.sql');
runSQLFile('create_table.sql');
runSQLFile('insert_categories.sql');
runSQLFile('insert_products.sql');
console.log('Seeding complete!');
