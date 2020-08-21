context('Favorite list', () => {

    context('One favorite', () => {
        it('One favorite after clicking one favorite button', () => {
            cy.visit('/');
            cy.wait(500);

            cy.get('body > app-root > app-item-list > table > tbody > tr:nth-child(1) > td.mat-cell.cdk-cell.cdk-column-image.mat-column-image.ng-star-inserted > button')
              .click();

            cy.get('.mat-toolbar > button')
            .click();

            cy.get('#mat-dialog-0')
            .should('exist');

            cy.get('.favorite-list')
              .should('have.lengthOf', 1);
        });

        it('Get one row as result: typing \'a\'', () => {
            cy.get('#mat-input-1')
              .type(' ');

            cy.get('.favorite-list')
              .should('have.lengthOf', 1);
        });

        it('Get 0 favorites after unmark our favorite', () => {
            cy.get('.mat-card-actions > .mat-focus-indicator')
            .click();

            cy.get('.favorite-list')
              .should('have.lengthOf', 0);
        });

    });

    context('More than one favorite', () => {
        it('More than one favorite after clicking two favorite button', () => {
            cy.visit('/');
            cy.wait(500);

            cy.get('body > app-root > app-item-list > table > tbody > tr:nth-child(1) > td.mat-cell.cdk-cell.cdk-column-image.mat-column-image.ng-star-inserted > button')
              .click();
            cy.get('body > app-root > app-item-list > table > tbody > tr:nth-child(2) > td.mat-cell.cdk-cell.cdk-column-image.mat-column-image.ng-star-inserted > button')
              .click();

            cy.get('.mat-toolbar > button')
              .click();

            cy.get('#mat-dialog-0')
              .should('exist');

            cy.get('.favorite-list')
              .should('have.lengthOf.gte', 1);
        });

        it('Get more than 0 favorites after unmark our favorite', () => {
            cy.get(':nth-child(1) > .mat-card-actions > .mat-focus-indicator')
              .click();

            cy.get('.favorite-list')
              .should('have.length.greaterThan', 0);
        });

    });
});
