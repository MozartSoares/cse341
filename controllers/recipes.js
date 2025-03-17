import Recipe from '../models/recipe.js';
import { ObjectId } from 'mongodb';

export const getAll = async (req, res) => {
  // #swagger.tags = ['Recipes']
  // #swagger.description = 'Endpoint to get all recipes'
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error });
  }
};

export const getSingle = async (req, res) => {
  // #swagger.tags = ['Recipes']
  // #swagger.description = 'Endpoint to get a single recipe'
  // #swagger.parameters['id'] = { description: 'Recipe ID' }
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid recipe id to fetch a recipe.');
  }

  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipe', error });
  }
};

export const create = async (req, res) => {
  // #swagger.tags = ['Recipes']
  // #swagger.description = 'Endpoint to create a recipe'
  /** 
      #swagger.parameters['body'] = {
      in: 'body',
      description: 'Recipe data',
      required: true,
      schema: {
        title: 'string',
        description: 'string',
        ingredients: [
          {
            ingredient: 'ObjectId',
            quantity: 'string'
          }
        ],
        instructions: 'string',
        cookingTime: 'number',
        difficulty: 'string',
        cuisine: 'string',
        servings: 'number'
      }
    }
  */
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res
      .status(201)
      .json({ message: 'Recipe created successfully', id: recipe._id, ...recipe.toObject() });
  } catch (error) {
    res.status(400).json({ message: 'Error creating recipe', error });
  }
};

export const update = async (req, res) => {
  // #swagger.tags = ['Recipes']
  // #swagger.description = 'Endpoint to update a recipe'
  // #swagger.parameters['id'] = { description: 'Recipe ID' }
  /**  
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Recipe data',
      required: true,
      schema: {
        title: 'string',
        description: 'string',
        ingredients: [
          {
            ingredient: 'ObjectId',
            quantity: 'string'
          }
        ],
        instructions: 'string',
        cookingTime: 'number',
        difficulty: 'string',
        cuisine: 'string',
        servings: 'number'
      }
    }
  */
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid recipe id to update a recipe.');
  }

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (updatedRecipe) {
      res.status(200).json({
        message: 'Recipe updated successfully',
        id: updatedRecipe._id,
        ...updatedRecipe.toObject(),
      });
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating recipe', error });
  }
};

export const remove = async (req, res) => {
  // #swagger.tags = ['Recipes']
  // #swagger.description = 'Endpoint to delete a recipe'
  // #swagger.parameters['id'] = { description: 'Recipe ID' }
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid recipe id to delete a recipe.');
  }

  try {
    const result = await Recipe.findByIdAndDelete(req.params.id);
    if (result) {
      res.status(200).json({ message: 'Recipe deleted successfully' });
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting recipe', error });
  }
};
