import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const IngredientSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    nutritionalInfo: {
      calories: Number,
      fat: Number,
      carbs: Number,
      protein: Number,
    },
    origin: String,
  },
  {
    timestamps: true,
    collection: 'ingredients',
  },
);
const Ingredient = model('Ingredient', IngredientSchema);
export default Ingredient;
