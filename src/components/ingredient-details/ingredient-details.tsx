import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { selectIngradient } from '../../slices/sliceIngredients';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  const ingredientData = useAppSelector((state) => selectIngradient(state, id));

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
