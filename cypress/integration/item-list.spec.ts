context('Item list', () => {
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

    context('Searching...', () => {
        it('Get one row as result: typing \'asc\'', () => {
            cy.get('#mat-input-0')
            .type('asc');

            cy.get('body > app-root > app-item-list > table > tbody > tr')
              .should('have.lengthOf', 1);
        });

        it('No results: typing \'aaa\'', () => {
            cy.get('#mat-input-0')
              .type('aaa');

            cy.get('body > app-root > app-item-list > table > tbody > tr')
              .should('have.lengthOf', 0);

            cy.get('.no-results')
              .should('be.visible');
        });
    });

    context('Playing with favorites', () => {
        it('Favorite icon enabled after clicking one favorite button', () => {
            cy.visit('/');
            cy.wait(500);

            cy.get('body > app-root > app-item-list > table > tbody > tr:nth-child(1) > td.mat-cell.cdk-cell.cdk-column-image.mat-column-image.ng-star-inserted > button')
              .click();

            cy.get('.mat-toolbar > button')
              .should('not.be.disabled');
        });

        it('Favorite list should appear after clicking favorites button', () => {
            cy.get('.mat-toolbar > button')
            .click();

            cy.get('#mat-dialog-0')
            .should('exist');
        });
    });
});
