const mockCategory = {
  name: 'Test Category',
  description: 'Test Category'
}

const mockTask = {
  name: 'Test Task',
  description: 'Test Task',
  category: mockCategory.name
}

describe('Tasks', () => {
  beforeEach(() => {
    // Create a new category
    cy.visit('/categories/new');
    cy.get('input[formControlName="name"]').type(mockCategory.name);
    cy.get('textarea[formControlName="description"]').type(mockCategory.description);
    cy.get('button').contains('Guardar').click();
    cy.visit('/tasks');
  })

  it('Creates new task', () => {
    cy.contains('Tareas').should('exist');

    // Create a new task
    const newTaskButton = cy.get('button').contains('Agregar');
    newTaskButton.click();
    cy.get('input[formControlName="name"]').type(mockTask.name);
    cy.get('textarea[formControlName="description"]').type(mockTask.description);
    cy.get('select[formControlName="categoryId"]').select(mockTask.category);
    cy.get('button').contains('Guardar').click();

    // Check if the task was created
    const task = cy.get('ul li').contains(mockTask.name);
    task.should('exist');

    // Check/uncheck task
    const taskCheckbox = task.get('input[type="checkbox"]');
    taskCheckbox.click();
    taskCheckbox.should('be.checked');
  })

})
