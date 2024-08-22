# NYESG Metrics Dashboard

## Overview

NYESG Metrics Dashboard is a web application designed to help companies track and visualize their Environmental, Social, and Governance (ESG) metrics. This dashboard provides insights into a company's energy usage, water usage, and waste disposal, with options to generate PDF reports for further analysis.

## Features

- **Interactive Charts:** Visualize energy usage, water usage, and waste disposal data with dynamic charts.
- **Report Generation:** Generate and download PDF reports for selected metrics.
- **Customizable Reporting:** Select specific metrics to include in the report.
- **National Averages:** Compare your data against national averages to gauge performance.
- **Modal Integration:** User-friendly modal for report generation options.
- **Responsive Design:** Optimized for different screen sizes and devices.

## Technologies Used

- **Frontend:**
  - Angular
  - TypeScript
  - SCSS
  - Chart.js
  - jsPDF
- **Backend:**
  - Node.js (if applicable)
  - Express (if applicable)
  - Spring Boot (if applicable)
- **Database:**
  - MySQL

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- Angular CLI
- MySQL

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/nyesg-dashboard.git
   cd nyesg-dashboard
   ```

2. **Install Dependencies:**

   ```bash
   Copy code
   npm install
   Set Up the Database:

   Create a MySQL database named nyesg.
   Import the provided database schema or run the backend service to auto-generate the necessary tables.
   Run the Application:
   ```

3. **Set Up Database**

   \*\*Create a MySQL database named nyesg.

   \*\*Import the provided database schema or run the backend service to auto-generate the necessary tables.

4. **Run the App**

`ng serve`
Navigate to http://localhost:4200 to view the application.

5.  **Running Test**

    _Unit Tests_

        To run unit tests:

        ```
        ng test
        ```

        **To run Integration Test:**

        ```
        ng test --integration

        ```

        ***Automation UI Testing

    Automated UI tests can be executed using a tool like Selenium or Cypress (provide specific instructions if implemented).\*\*\*

6.  **Dockerization**
    **To run the application in a Docker container:**

Build the Docker Image:

```
bash
Copy code
docker build -t nyesg-dashboard .
Run the Docker Container:

bash
Copy code
docker run -p 4200:4200 nyesg-dashboard
```

7. Deployment
   \*Instructions for deploying the application to a cloud provider (e.g., AWS, Azure) or a hosting service like Netlify or GitHub Pages.

8. File Structure

```
/src
  /app
    /components
      /navbar
      /util/modal
      /energy-usage-chart-component
      /water-usage-chart-component
      /waste-disposal-chart-component
    /services
      /calculation.service.ts
      /energy-usage.service.ts
      /water-usage.service.ts
      /waste-disposal.service.ts
  app.component.ts
  app.module.ts
  main.ts
  ...
/assets
  /styles
    /global.scss
```

##Future Enhancement

-Real-time Data Integration: Incorporate real-time data for instant updates.

-AI/ML Integration: Use machine learning for predictive analytics.
Advanced Reporting: Include more detailed and customizable reporting options.

-Multi-language Support: Localize the application for international use.

##Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
For questions or support, please reach out on github.
