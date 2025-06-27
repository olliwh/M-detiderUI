import { STATUS } from './utils/statusUtils.js';
import { CalendarEntry } from './calendarEntry.js';
class EmployeeModel {
    constructor() {
        this.employees = [];
        this.currentFilter = 'all';
        this.searchQuery = '';
    }

    // API Service methods
    async fetchData(url, token) {
        try {
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json().catch(() => {
                throw new Error('Invalid JSON')
            });

            console.log('Data fetched:', data);
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    getCurrentDateString() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    transformEmployeeData(entry) {
        const today = this.getCurrentDateString();
        return new CalendarEntry(entry, today);
    }

    async fetchEmployees() {
        try {
            const currentDate = this.getCurrentDateString();
            const url = `${CONFIG.apiUrl}calendarbydate?date=${currentDate}`;
            console.log(url);

            const data = await this.fetchData(url, CONFIG.apiToken);

            let rawEmployees = [];

            // Handle different response formats
            if (Array.isArray(data)) {
                rawEmployees = data;
            } else if (data.results) {
                rawEmployees = data.results;
                console.log(`Total records reported: ${data.total}, Records received: ${data.results.length}`);
            } else {
                throw new Error('Unexpected API response format');
            }

            if (rawEmployees.length === 0) {
                console.warn('No employee data found for today');
                this.employees = [];
                return [];
            }

            // Transform to employee objects and filter out unknown status
            this.employees = rawEmployees
                .map(entry => this.transformEmployeeData(entry))
                .filter(employee => employee.status !== STATUS.UNKNOWN);

            return this.employees;
        } catch (error) {
            console.error('Error fetching employee data:', error);
            throw error;
        }
    }

    // Filter and search methods
    setFilter(filter) {
        this.currentFilter = filter;
    }

    setSearchQuery(query) {
        this.searchQuery = query;
    }

    getFilteredEmployees() {
        return this.employees.filter(employee => {
            const matchesSearch = employee.name.toLowerCase().includes(this.searchQuery.toLowerCase());
            const matchesFilter = this.currentFilter === 'all' || employee.status === this.currentFilter;

            return matchesSearch && matchesFilter;
        });
    }

    getStatusCounts() {
        return {
            all: this.employees.length,
            office: this.employees.filter(e => e.status === STATUS.OFFICE).length,
            home: this.employees.filter(e => e.status === STATUS.HOME).length,
            sick: this.employees.filter(e => e.status === STATUS.SICK).length,
            holiday: this.employees.filter(e => e.status === STATUS.HOLIDAY).length
        };
    }
}
export { EmployeeModel };