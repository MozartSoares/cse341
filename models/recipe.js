import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const RecipeSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    ingredients: [
      {
        ingredient: { type: Schema.Types.ObjectId, ref: 'Ingredient', required: true },
        quantity: { type: String, required: true }, // e.g., "1 cup", "200g"
      },
    ],
    instructions: { type: String, required: true },
    cookingTime: { type: Number, required: true },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    cuisine: { type: String },
    servings: { type: Number },
  },
  { timestamps: true },
  { collection: 'recipes' },
);

export default model('Recipe', RecipeSchema);
