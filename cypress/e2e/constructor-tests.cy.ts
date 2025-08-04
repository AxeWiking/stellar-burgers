import * as constant from '@constants';

describe('проверям добавление ингредиентов в конструкторе', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000');
  });

  it('ингредиент булки должен появиться в конструкторе по кнопке "Добавить"', () => {
    const bun = cy.get(
      `[data-testid="ingredient-id-${constant.cratorBun._id}"]`
    );
    const addBunButton = bun.contains('button', 'Добавить');
    cy.get('[data-testid="constructor-element-top"]').should('not.exist');
    cy.get('[data-testid="constructor-element-top-empty"]')
      .contains(`${constant.cratorBun.name} (верх)`)
      .should('not.exist');
    cy.get('[data-testid="constructor-element-bottom"]').should('not.exist');
    cy.get('[data-testid="constructor-element-bottom-empty"]')
      .contains(`${constant.cratorBun.name} (низ)`)
      .should('not.exist');
    addBunButton.click();
    cy.get('[data-testid="constructor-element-top"]')
      .contains(`${constant.cratorBun.name} (верх)`)
      .should('exist');
    cy.get('[data-testid="constructor-element-bottom"]')
      .contains(`${constant.cratorBun.name} (низ)`)
      .should('exist');
  });

  it('ингредиент котлеты должен появиться в конструкторе по кнопке "Добавить"', () => {
    const ingredient = cy.get(
      `[data-testid="ingredient-id-${constant.biococlet._id}"]`
    );
    const addIngredientButton = ingredient.contains('button', 'Добавить');
    cy.get('[data-testid="constructor-elements-list"]')
      .contains(constant.biococlet.name)
      .should('not.exist');
    addIngredientButton.click();
    cy.get('[data-testid="constructor-elements-list"]')
      .contains(constant.biococlet.name)
      .should('exist');
  });
});

describe('проверяем работу модального окна', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000');
  });

  it('открытие модального окна для булочки', () => {
    const bun = cy.get(
      `[data-testid="ingredient-id-${constant.cratorBun._id}"]`
    );

    cy.contains('Детали ингредиента').should('not.exist');
    bun.click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains(constant.cratorBun.name).should('exist');
  });
  it('закрытие модального окна нажатием на кнопку', () => {
    const bun = cy.get(
      `[data-testid="ingredient-id-${constant.cratorBun._id}"]`
    );

    cy.contains('Детали ингредиента').should('not.exist');
    bun.click();
    cy.contains('Детали ингредиента').should('exist');

    cy.get('[data-testid="modal-close-button"]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });
  it('закрытие модального окна нажатием на оверлей', () => {
    const bun = cy.get(
      `[data-testid="ingredient-id-${constant.cratorBun._id}"]`
    );

    cy.contains('Детали ингредиента').should('not.exist');
    bun.click();
    cy.contains('Детали ингредиента').should('exist');

    cy.get('[data-testid="modal-overlay"]').click('top', { force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('оформляем заказ', () => {
  const orderNumber = 777;
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    window.localStorage.setItem('refreshToken', JSON.stringify('qwerty'));
    cy.setCookie('accessToken', 'secret');
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    cy.visit('http://localhost:4000');
  });

  afterEach(() => {
    cy.clearAllLocalStorage();
    cy.clearCookies();
  });

  it('покупка бургера', function () {
    const bun = cy.get(
      `[data-testid="ingredient-id-${constant.cratorBun._id}"]`
    );
    const addBunButton = bun.contains('button', 'Добавить');
    addBunButton.click();
    cy.get('[data-testid="constructor-element-top"]')
      .contains(`${constant.cratorBun.name} (верх)`)
      .should('exist');
    cy.get('[data-testid="constructor-element-bottom"]')
      .contains(`${constant.cratorBun.name} (низ)`)
      .should('exist');

    const coclet = cy.get(
      `[data-testid="ingredient-id-${constant.biococlet._id}"]`
    );
    const sauce = cy.get(
      `[data-testid="ingredient-id-${constant.spicySauce._id}"]`
    );
    const addCocletButton = coclet.contains('button', 'Добавить');
    const addSauceButton = sauce.contains('button', 'Добавить');
    addCocletButton.click();
    addSauceButton.click();

    cy.get('[data-testid="constructor-elements-list"]')
      .contains(constant.spicySauce.name)
      .should('exist');
    cy.get('[data-testid="constructor-elements-list"]')
      .contains(constant.biococlet.name)
      .should('exist');

    cy.get('[data-testid=order-number]').should('not.exist');
    const panel = cy.get(`[data-testid="constructor-order-panel"]`);
    panel.contains('Оформить заказ').click();
    cy.get('[data-testid=order-number]').contains(orderNumber).should('exist');
    cy.get('[data-testid="modal-close-button"]').click();
    cy.get('[data-testid=order-number]').should('not.exist');

    cy.get('[data-testid="constructor-element-top"]').should('not.exist');
    cy.get('[data-testid="constructor-element-top-empty"]')
      .contains(`${constant.cratorBun.name} (верх)`)
      .should('not.exist');
    cy.get('[data-testid="constructor-element-bottom"]').should('not.exist');
    cy.get('[data-testid="constructor-element-bottom-empty"]')
      .contains(`${constant.cratorBun.name} (низ)`)
      .should('not.exist');
    cy.get('[data-testid="constructor-elements-list"]')
      .contains(constant.spicySauce.name)
      .should('not.exist');
    cy.get('[data-testid="constructor-elements-list"]')
      .contains(constant.biococlet.name)
      .should('not.exist');
  });
});
