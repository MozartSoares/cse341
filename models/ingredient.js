import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const IngredientSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    nutritionalInfo: {
      calories: { type: Number },
      fat: { type: Number },
      carbs: { type: Number },
      protein: { type: Number },
    },
    origin: { type: String },
  },
  { timestamps: true },
  { collection: 'ingredients' },
);

export default model('Ingredient', IngredientSchema);
