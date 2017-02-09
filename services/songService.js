/* jshint esversion: 6 */

'use strict';

const db = require('../database');

exports.find = (query = {}) => {
  return db.Songs.findAll({
      where: query
  });
};

exports.findById = id => {
  return db.Songs.findById(id);
};

exports.create = (song) => {
  const model = db.Songs.build(song);
  return model.validate()
    .then(err => {
        if (err) {
          return Promise.reject(err);
        }
        return model.save();
    })
  ;
};

exports.delete = (song) => {
  const model = db.Songs.delete(song);
  return model.validate()
    .then(err => {
        if (err) {
          return Promise.reject(err);
        }
        return model.save();
    })
  ;
};

// exports.delete = (song) => {
//   const model = db.Songs.build(song);
//   return model.validate()
//     .then(err => {
//         if (err) {
//           return Promise.reject(err);
//         }
//         return model.save();
//     })
//   ;
// };
