import { expect, test } from '@jest/globals';
import {
  reducer,
  StateDesigner,
  pickIngredient,
  designTuneLess,
  designTuneMore,
  designTuneDrop,
  designClear
} from './sliceDesigner';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import * as constant from '../constants/constants';

function RemoveId(item: TConstructorIngredient): TIngredient {
  const { id, ...data } = item;
  return data;
}

describe('тестируем редьюсер конструктора', () => {
  const mockStateDesigner: StateDesigner = {
    bun: { id: 'one test bun', ...constant.cratorBun },
    filling: [
      { id: 'one test fill', ...constant.tetraFillets },
      { id: 'too test fill', ...constant.undeadMeat }
    ]
  };
  const mockBun = constant.fluorescentBun;
  const mockSauce = constant.firmSauce;

  test('добавим еще соуса', () => {
    const state = reducer(mockStateDesigner, pickIngredient(mockSauce));
    expect(state.bun).not.toBeFalsy();
    expect(state.filling).not.toBeFalsy();

    const stateFillIngredients = state.filling.map(RemoveId);
    const testFillIngredients = mockStateDesigner.filling
      .map(RemoveId)
      .concat([mockSauce]);

    expect(state.bun).toEqual(mockStateDesigner.bun);
    expect(stateFillIngredients).toEqual(testFillIngredients);
  });

  test('добавим еще булку', () => {
    const state = reducer(mockStateDesigner, pickIngredient(mockBun));
    expect(state.bun).not.toBeFalsy();
    expect(state.filling).not.toBeFalsy();

    expect(RemoveId(state.bun!)).toEqual(mockBun);
    expect(state.filling).toEqual(mockStateDesigner.filling);
  });

  test('перемешаем начинку (движение вверх)', () => {
    const state = reducer(
      mockStateDesigner,
      designTuneLess(mockStateDesigner.filling[1].id)
    );
    expect(state.bun).not.toBeFalsy();
    expect(state.filling).not.toBeFalsy();
    expect(state.bun).toEqual(mockStateDesigner.bun);
    expect(state.filling).toHaveLength(mockStateDesigner.filling.length);
    expect(state.filling[0]).toEqual(mockStateDesigner.filling[1]);
    expect(state.filling[1]).toEqual(mockStateDesigner.filling[0]);
  });

  test('перемешаем начинку (движение вниз)', () => {
    const state = reducer(
      mockStateDesigner,
      designTuneMore(mockStateDesigner.filling[0].id)
    );
    expect(state.bun).not.toBeFalsy();
    expect(state.filling).not.toBeFalsy();
    expect(state.bun).toEqual(mockStateDesigner.bun);
    expect(state.filling).toHaveLength(mockStateDesigner.filling.length);
    expect(state.filling[0]).toEqual(mockStateDesigner.filling[1]);
    expect(state.filling[1]).toEqual(mockStateDesigner.filling[0]);
  });

  test('выбросим филешку', () => {
    const dropId = mockStateDesigner.filling[0].id;
    const state = reducer(mockStateDesigner, designTuneDrop(dropId));
    expect(state.bun).not.toBeFalsy();
    expect(state.filling).not.toBeFalsy();
    expect(state.bun).toEqual(mockStateDesigner.bun);
    expect(state.filling).toEqual(
      mockStateDesigner.filling.filter((item) => item.id !== dropId)
    );
  });

  test('почистим конструктор', () => {
    const state = reducer(mockStateDesigner, designClear());
    expect(state.bun).toBeNull();
    expect(state.filling).not.toBeFalsy();
    expect(state.filling).toHaveLength(0);
  });
});
