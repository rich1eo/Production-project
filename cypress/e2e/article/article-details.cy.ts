let currentArticleId: string;

describe('Authorized User visit Article Detail page', () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle().then((article) => {
      currentArticleId = article.id;
      cy.visit(`articles/${currentArticleId}`);
    });
  });

  afterEach(() => {
    cy.removeArticle(currentArticleId);
  });

  it('successfully render article details', () => {
    cy.getByTestId('ArticleDetails.Info').should('exist');
  });

  it('successfully render article recommendation list', () => {
    cy.getByTestId('ArticleRecommendationList').should('exist');
  });

  it('successfully create a comment', () => {
    cy.getByTestId('ArticleDetails.Info');
    cy.getByTestId('AddCommentForm').scrollIntoView();
    cy.addComment('test comment');
    cy.getByTestId('CommentCard.content').should('have.length', 1);
  });

  it('successfully create rating', () => {
    cy.getByTestId('ArticleDetails.Info');
    cy.getByTestId('RatingCard').scrollIntoView();
    cy.setRate(5, 'feedback');
    cy.get('[data-selected=true]').should('have.length', 5);
  });
});
