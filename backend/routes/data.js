const express = require('express');
const router = express.Router();

/* GET some data */
router.get('#', async (req, res, next) => {
  const data = Boards.find();
  res.send(data);
});

/* SAVE some data */
router.post('/new', async (req, res, next) => {
  const {data} = req.body;
  console.log('data', data);
  const newBoard = Boards({data});
  await newBoard.save();
  res.send(newBoard);
});

/* UPDATE some data or do something else */
router.patch('/:id', async (req, res, next) => {
  const { board } = req.body;
  const boards = await Boards.findById(req.params.id);
  await boards.save();
  res.send(boards)
});

/* DELETE data */
router.delete('/:id', async () => {
  const boards = await Boards.findById(req.params.id);
  if (boards) {
    boards.isVisible = !boards.isVisible;
    await boards.save();
  }
  res.send(boards);
})

module.exports = router;
