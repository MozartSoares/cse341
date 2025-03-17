import Ingredient from '../models/ingredient.js';
import { ObjectId } from 'mongodb';

export const getAll = async (req, res) => {
  // #swagger.tags = ['Ingredients']
  // #swagger.description = 'Endpoint to get all ingredients'
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ingredients', error });
  }
};

export const getSingle = async (req, res) => {
  // #swagger.tags = ['Ingredients']
  // #swagger.description = 'Endpoint to get a single ingredient'
  // #swagger.parameters['id'] = { description: 'Ingredient ID' }
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid ingredient id to fetch an ingredient.');
  }
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    if (ingredient) {
      res.status(200).json(ingredient);
    } else {
      res.status(404).json({ message: 'Ingredient not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ingredient', error });
  }
};

export const create = async (req, res) => {
  // #swagger.tags = ['Ingredients']
  // #swagger.description = 'Endpoint to create an ingredient'
  /** 
    #swagger.parameters['body'] = {
    in: 'body',
    description: 'Ingredient data',
    required: true,
    schema: {
        name:  'string' ,
        type:  'string' ,
        nutritionalInfo: { 
            calories:  'number' ,
            fat:  'number' ,
            carbs:  'number' ,
            protein:  'number'}
        },
        origin:  'string'}
    }
  }
 */

  try {
    const ingredient = new Ingredient(req.body);
    await ingredient.save();
    res.status(201).json({
      message: 'Ingredient created successfully',
      id: ingredient._id,
      ...ingredient.toObject(),
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating ingredient', error });
  }
};

export const update = async (req, res) => {
  // #swagger.tags = ['Ingredients']
  // #swagger.description = 'Endpoint to update an ingredient'
  // #swagger.parameters['id'] = { description: 'Ingredient ID' }
  /**  
      #swagger.parameters['body'] = {
      in: 'body',
      description: 'Ingredient data',
      required: true,
      schema: {
        name: 'string',
        type: 'string',
        nutritionalInfo: {
          calories: 'number',
          fat: 'number',
          carbs: 'number',
          protein: 'number'
        },
        origin: 'string'
      }
    }
  */
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid ingredient id to update an ingredient.');
  }
  try {
    const updatedIngredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (updatedIngredient) {
      res.status(200).json({
        message: 'Ingredient updated successfully',
        id: updatedIngredient._id,
        ...updatedIngredient.toObject(),
      });
    } else {
      res.status(404).json({ message: 'Ingredient not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating ingredient', error });
  }
};

export const remove = async (req, res) => {
  // #swagger.tags = ['Ingredients']
  // #swagger.description = 'Endpoint to delete an ingredient'
  // #swagger.parameters['id'] = { description: 'Ingredient ID' }
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid ingredient id to delete an ingredient.');
  }
  try {
    const result = await Ingredient.findByIdAndDelete(req.params.id);
    if (result) {
      res.status(200).json({ message: 'Ingredient deleted successfully' });
    } else {
      res.status(404).json({ message: 'Ingredient not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ingredient', error });
  }
};
