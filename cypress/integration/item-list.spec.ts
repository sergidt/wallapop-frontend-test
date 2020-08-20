context('Item list', () => {
    // beforeEach(() => {
    //     cy.visit('/');
    //     cy.wait(500);
    // });

    context('First Paint', () => {
        it('Item list is not empty', () => {
            cy.visit('/');
            cy.wait(500);
            cy.get('body > app-root > app-item-list > table > tbody > tr')
              .should('not.be.empty');
        });

        it('Favorite button should be disabled', () => {
            cy.get('.mat-toolbar > button')
              .should('be.disabled');
        });

        it('There is a filter field', () => {
            cy.get('.mat-form-field-type-mat-input > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix')
              .should('exist');
        });

        it('There is a pagination', () => {
            cy.get('.mat-paginator-container')
              .should('exist');
        });
    });
});
