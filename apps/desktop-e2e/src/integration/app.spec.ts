import { getGreeting } from '../support/app.po';

describe('desktop', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to desktop!');
  });
});
