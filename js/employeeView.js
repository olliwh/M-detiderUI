import {STATUS_TEXT } from './utils/statusUtils.js';

class EmployeeView {
  constructor() {
    this.employeesGrid = document.getElementById('employees-grid');
    this.searchInput = document.getElementById('search-input');
    this.filterButtons = document.querySelectorAll('.filter-button');
    this.noResults = document.getElementById('no-results');
    
    // Counter elements
    this.countAll = document.getElementById('count-all');
    this.countOffice = document.getElementById('count-office');
    this.countHome = document.getElementById('count-home');
    this.countSick = document.getElementById('count-sick');
  }

  createEmployeeCard(employee) {
    const birthdayFlag = employee.hasBirthday() ? 
      `<div class="birthday-flag"></div>` : '';

    return `
      <div class="employee-card">
        <div class="employee-content">
          <div class="photo-container">
            <img src="${employee.photo}" alt="${employee.name}" class="employee-photo">
            <div class="status-dot ${employee.status}"></div>
            ${birthdayFlag}
          </div>
          <h3 class="employee-name">${employee.name}</h3>
          <span class="status-badge ${employee.status}">${STATUS_TEXT[employee.status]}</span>
        </div>
      </div>
    `;
  }

  renderEmployees(employees) {
    this.employeesGrid.innerHTML = employees.map(employee => 
      this.createEmployeeCard(employee)
    ).join('');
    
    this.noResults.style.display = employees.length === 0 ? 'block' : 'none';
  }

  updateCounters(counts) {
    this.countAll.textContent = counts.all;
    this.countOffice.textContent = counts.office;
    this.countHome.textContent = counts.home;
    this.countSick.textContent = counts.sick;
  }

  showError(message) {
    this.employeesGrid.innerHTML = `<div class="error-message">${message}</div>`;
  }

  setActiveFilter(activeButton) {
    this.filterButtons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');
  }

  // Event listener setup helpers
  onSearchInput(callback) {
    this.searchInput.addEventListener('input', callback);
  }

  onFilterClick(callback) {
    this.filterButtons.forEach(button => {
      button.addEventListener('click', () => callback(button));
    });
  }
}
export { EmployeeView };