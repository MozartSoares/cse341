import mongoose from 'mongoose';
import Ingredient from '../models/ingredient.js';

export const getAll = async (req, res) => {
  // #swagger.tags = ['Ingredient']
  // #swagger.description = 'Get all ingredients'
  try {
    const ingredients = await Ingredient.find({}).exec();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ingredients', error: error.message });
  }
};

export const getSingle = async (req, res) => {
  // #swagger.tags = ['Ingredient']
  // #swagger.description = 'Get a single ingredient by id'
  // #swagger.parameters['id'] = { description: 'Ingredient id', type: 'string', required: true }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json({ message: 'Must use a valid ingredient id to fetch an ingredient.' });
  }
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    res.setHeader('Content-Type', 'application/json');
    if (ingredient) {
      res.status(200).json(ingredient);
    } else {
      res.status(404).json({ message: 'Ingredient not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ingredient', error: error.message });
  }
};

export const create = async (req, res) => {
  // #swagger.tags = ['Ingredient']
  // #swagger.description = 'Create a new ingredient'
  const { name, type } = req.body;
  if (!name || !type) {
    return res
      .status(400)
      .json({ message: 'Missing required fields: name and type are required.' });
  }
  try {
    const ingredient = new Ingredient(req.body);
    await ingredient.save();
    res.setHeader('Content-Type', 'application/json');
    res
      .status(201)
      .json({
        message: 'Ingredient created successfully',
        id: ingredient._id,
        ...ingredient.toObject(),
      });
  } catch (error) {
    res.status(400).json({ message: 'Error creating ingredient', error: error.message });
  }
};

export const update = async (req, res) => {
  // #swagger.tags = ['Ingredient']
  // #swagger.description = 'Update an ingredient by id'
  // #swagger.parameters['id'] = { description: 'Ingredient id', type: 'string', required: true }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json({ message: 'Must use a valid ingredient id to update an ingredient.' });
  }
  try {
    const updatedIngredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.setHeader('Content-Type', 'application/json');
    if (updatedIngredient) {
      res
        .status(200)
        .json({
          message: 'Ingredient updated successfully',
          id: updatedIngredient._id,
          ...updatedIngredient.toObject(),
        });
    } else {
      res.status(404).json({ message: 'Ingredient not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating ingredient', error: error.message });
  }
};

export const remove = async (req, res) => {
  // #swagger.tags = ['Ingredient']
  // #swagger.description = 'Delete an ingredient by id'
  // #swagger.parameters['id'] = { description: 'Ingredient id', type: 'string', required: true }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json({ message: 'Must use a valid ingredient id to delete an ingredient.' });
  }
  try {
    const result = await Ingredient.findByIdAndDelete(req.params.id);
    res.setHeader('Content-Type', 'application/json');
    if (result) {
      res.status(200).json({ message: 'Ingredient deleted successfully' });
    } else {
      res.status(404).json({ message: 'Ingredient not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ingredient', error: error.message });
  }
};
