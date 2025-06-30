import styles from './constructor-page.module.css';
import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import { TWallPaperProps } from '@utils-types';
import { useAppSelector, useAppDispatch } from '../../services/store';
import {
  fetchIngredients,
  selectIsIngredientsLoading
} from '../../slices/sliceIngredients';

export const ConstructorPage: FC<TWallPaperProps> = ({
  wallpaper
}: TWallPaperProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  const isIngredientsLoading = useAppSelector(selectIsIngredientsLoading);

  return (
    <>
      {isIngredientsLoading ? (
        wallpaper ? null : (
          <Preloader />
        )
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
