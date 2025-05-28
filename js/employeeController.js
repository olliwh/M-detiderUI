import { EmployeeModel } from './employeeModel.js';
import { EmployeeView } from './employeeView.js';

class EmployeeController {
  constructor() {
    this.model = new EmployeeModel();
    this.view = new EmployeeView();
    this.setupEventListeners();
    this.setupAutoRefresh();
  }

  setupEventListeners() {
    // Search functionality
    this.view.onSearchInput((e) => {
      this.model.setSearchQuery(e.target.value);
      this.renderFilteredEmployees();
    });

    // Filter buttons
    this.view.onFilterClick((button) => {
      this.view.setActiveFilter(button);
      this.model.setFilter(button.dataset.status);
      this.renderFilteredEmployees();
    });
  }

  setupAutoRefresh() {
    // 15 minutes refresh interval
    setInterval(() => {
      this.loadEmployees();
    }, 900000);
  }

  async loadEmployees() {
    try {
      await this.model.fetchEmployees();
      this.view.updateCounters(this.model.getStatusCounts());
      this.renderFilteredEmployees();
    } catch (error) {
      this.view.showError(`Failed to load employee data: ${error.message}`);
    }
  }

  renderFilteredEmployees() {
    const filteredEmployees = this.model.getFilteredEmployees();
    this.view.renderEmployees(filteredEmployees);
  }

  async init() {
    await this.loadEmployees();
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  const controller = new EmployeeController();
  controller.init();
});