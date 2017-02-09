/* jshint esversion: 6 */

const router = require('express').Router();
const SongService = require('../services/songService');
const _ = require('lodash');

router.post('/', (req, res) => {

  // const keys = _.keys(req,body);




  return SongService.create(req.body)
    .then(song => {         res.status(201).send(song);
    })
    .catch(err => {
      res.status(500).send(err);
    })
  ;
});

router.get('/', (req, res) => {
  SongService.find(req.query)
    .then(songs => {
      res.status(200).send(songs);
      // res.render('songs', { songs: songs });
    })
  ;
});

router.delete('/', (req, res) => {
  SongService.destroy(req.query)
    .then(songs => {
      res.status(200).send(songs);
    })
    .catch(err => {
      res.status(500).send(err);
    })
  ;
});

router.get('/:id', (req, res) => {
  SongService.findById(req.params.id)
    .then(songs => {
      res.status(200).send(songs);
    })
    .catch(err => {
      res.status(500).send(err);
    })
  ;
});

router.get('/:id', (req, res) => {
  if (!req.accepts('text/html') && !req.accepts('application/json')) {
    return res.status(406).send({err: 'Not valid type for asked resource'});
  }

  SongService.findOneByQuery({_id: req.params.id})
    .then(song => {
        if (!song) {
          return res.status(404).send({err: `id ${req.params.id} not found`});
        }
        if (req.accepts('text/html')) {
          return res.render('song', {song: song});
        }
        if (req.accepts('application/json')) {
          return res.status(200).send(song);
        }
      })
    ;
});

module.exports = router;
