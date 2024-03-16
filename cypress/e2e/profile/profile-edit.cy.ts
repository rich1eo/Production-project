let profileId: string;

describe('Authorized user on his profile page', () => {
  beforeEach(() => {
    cy.login().then((data) => {
      profileId = data.id;
      cy.visit(`profile/${profileId}`);
    });
  });
  afterEach(() => {
    cy.resetProfile(profileId);
  });
  it('profile loads successfully', () => {
    cy.getByTestId('ProfileCard.firstName').should('have.value', 'Cypress');
  });
  it('user can edit profile', () => {
    const newFirstName = 'new first name';
    const newSecondName = 'new second name';
    cy.updateProfile(newFirstName, newSecondName);
    cy.getByTestId('ProfileCard.firstName').should('have.value', newFirstName);
    cy.getByTestId('ProfileCard.secondName').should(
      'have.value',
      newSecondName
    );
  });
});
