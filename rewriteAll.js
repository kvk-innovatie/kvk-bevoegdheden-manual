'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('src/all.json');
let all = JSON.parse(rawdata);
// all = all.map((item, index) => ({ ...item, id: `id-${index}` }));
all = all.map((item) => ({
  kvkNummer: item.kvkNummer,
  typeRechtsvorm: item.typeRechtsvorm,
  rechtsvorm: item.rechtsvorm,
  functionaris: { ...item.person, ...item.functionaris },
  id: item.id,
}));

fs.writeFileSync('all2.json', JSON.stringify(all));
