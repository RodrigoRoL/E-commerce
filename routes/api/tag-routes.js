const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tag be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: "Tags cant be found"});
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id` be sure to include its associated Product data
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product}],
    });
    if (!tagData){
      res.status(404).json({ message: "No tag found can be found with this id"});
      return;
    } res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: "Tag cant be found"});
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json({ message: "Failed to create a Tag"});
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updated = await Tag.update(req.body, {
      where: { id: req.params.id},
    });
    !updated[0] ? res.status(404).json({ message: "Cant found a tag with the id"}) : res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update the tag"});
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleted = await Tag.destroy({ where: {id: req.params.id}});
    !deleted ? res.status(404).json({ message: "Cant found a tag with this id"}) : res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ message: "Failed to delete taf"});
  }
});

module.exports = router;