import mongoose from 'mongoose';
import Recipe from '../models/recipe.js';

export const getAll = async (req, res) => {
  // #swagger.tags = ['Recipe']
  // #swagger.description = 'Get all recipes'
  try {
    const recipes = await Recipe.find();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error: error.message });
  }
};

export const getSingle = async (req, res) => {
  // #swagger.tags = ['Recipe']
  // #swagger.description = 'Get a single recipe by id'
  // #swagger.parameters['id'] = { description: 'Recipe id', type: 'string', required: true }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid recipe id to fetch a recipe.' });
  }
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.setHeader('Content-Type', 'application/json');
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipe', error: error.message });
  }
};

export const create = async (req, res) => {
  // #swagger.tags = ['Recipe']
  // #swagger.description = 'Create a new recipe'
  const { title, instructions, cookingTime, ingredients } = req.body;
  if (!title || !instructions || cookingTime === undefined) {
    return res
      .status(400)
      .json({
        message: 'Missing required fields: title, instructions, and cookingTime are required.',
      });
  }
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return res
      .status(400)
      .json({ message: 'Missing required field: at least one ingredient is required.' });
  }
  for (let item of ingredients) {
    if (!item.ingredient || !item.quantity) {
      return res
        .status(400)
        .json({
          message:
            'Each ingredient in the ingredients list must include an "ingredient" id and a "quantity".',
        });
    }
    if (!mongoose.Types.ObjectId.isValid(item.ingredient)) {
      return res
        .status(400)
        .json({ message: 'Invalid ingredient id provided in the ingredients list.' });
    }
  }
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.setHeader('Content-Type', 'application/json');
    res
      .status(201)
      .json({ message: 'Recipe created successfully', id: recipe._id, ...recipe.toObject() });
  } catch (error) {
    res.status(400).json({ message: 'Error creating recipe', error: error.message });
  }
};

export const update = async (req, res) => {
  // #swagger.tags = ['Recipe']
  // #swagger.description = 'Update a recipe by id'
  // #swagger.parameters['id'] = { description: 'Recipe id', type: 'string', required: true }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid recipe id to update a recipe.' });
  }
  if (req.body.ingredients) {
    if (!Array.isArray(req.body.ingredients) || req.body.ingredients.length === 0) {
      return res
        .status(400)
        .json({ message: 'Ingredients must be a non-empty array if provided.' });
    }
    for (let item of req.body.ingredients) {
      if (!item.ingredient || !item.quantity) {
        return res
          .status(400)
          .json({
            message:
              'Each ingredient in the ingredients list must include an "ingredient" id and a "quantity".',
          });
      }
      if (!mongoose.Types.ObjectId.isValid(item.ingredient)) {
        return res
          .status(400)
          .json({ message: 'Invalid ingredient id provided in the ingredients list.' });
      }
    }
  }
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.setHeader('Content-Type', 'application/json');
    if (updatedRecipe) {
      res
        .status(200)
        .json({
          message: 'Recipe updated successfully',
          id: updatedRecipe._id,
          ...updatedRecipe.toObject(),
        });
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating recipe', error: error.message });
  }
};

export const remove = async (req, res) => {
  // #swagger.tags = ['Recipe']
  // #swagger.description = 'Delete a recipe by id'
  // #swagger.parameters['id'] = { description: 'Recipe id', type: 'string', required: true }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid recipe id to delete a recipe.' });
  }
  try {
    const result = await Recipe.findByIdAndDelete(req.params.id);
    res.setHeader('Content-Type', 'application/json');
    if (result) {
      res.status(200).json({ message: 'Recipe deleted successfully' });
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting recipe', error: error.message });
  }
};
