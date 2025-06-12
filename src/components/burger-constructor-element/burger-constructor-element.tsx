import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import {
  designTuneLess,
  designTuneMore,
  designTuneDrop
} from '../../slices/sliceDesigner';
import { useAppDispatch } from '../../services/store';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useAppDispatch();

    const handleMoveDown = () => {
      dispatch(designTuneMore(ingredient.id));
    };

    const handleMoveUp = () => {
      dispatch(designTuneLess(ingredient.id));
    };

    const handleClose = () => {
      dispatch(designTuneDrop(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
