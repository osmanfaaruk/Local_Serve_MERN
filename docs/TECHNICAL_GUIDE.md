# LocalServe Technical Guide 📖

This guide is for developers (you and your friends) to understand how the LocalServe platform works under the hood. It explains the project structure, how data flows, and where to find important logic.

---

## 🏗️ 1. Project Architecture

The project is split into three main parts:

### A. `User-Website/`
This is the public-facing site where users search for service providers.
*   `index.html`: The landing page with search functionality.
*   `search-providers.html`: Displays search results and lists all providers.
*   `provider-details.html`: Shows detailed information about a single provider.
*   `request-to-serve.html`: The form where new providers can register.

### B. `Admin-Dashboard/`
This is the secure area for managing the platform.
*   `index.html`: The main dashboard overview.
*   `manage-providers.html`: Table showing all registered providers with options to approve/delete.
*   `manage-categories.html` & `manage-locations.html`: To manage dropdown options.

### C. `assets/`
Contains shared resources used by *both* the User Website and Admin Dashboard.
*   `css/`: Global styles and utilities.
*   `js/`: Core logic (e.g., `provider-form-core.js` for form validation).
*   `icons/` & `images/`: Shared visual assets.

---

## 💾 2. Data Flow (JSON)

Since this project doesn't use a live database (like MySQL or MongoDB) yet, it simulates a database using JSON files located in `Admin-Dashboard/data/`.

**How it works:**
1.  **Reading Data**: When a page loads (e.g., `search-providers.html`), JavaScript fetches `providers.json` using `fetch()`.
2.  **Displaying Data**: The JS loops through the JSON data and dynamically creates HTML (`<div>` elements) to show the providers on the screen.
3.  **Writing Data (Simulated)**: Because vanilla JavaScript in a browser cannot natively save files to your computer (for security), the "Add Provider" forms simulate saving. In a real production app, this would send an API request to a backend server (Node.js/Python).

---

## 🛠️ 3. Core JavaScript Functions Explained

Here are the most important JavaScript functions in the codebase and what they do:

### In `assets/js/provider-form-core.js`
This file handles the multi-step registration form.

*   `setupFormNavigation()`
    *   **Purpose**: Handles navigating between "Step 1", "Step 2", etc.
    *   **How**: Hides the current step segment and shows the next one based on button clicks.

*   `validateCurrentStep(step)`
    *   **Purpose**: Ensures all required fields (like Name, Email) in the current form step are filled out before letting the user proceed.
    *   **Why**: Prevents blank or invalid data from being "submitted".

*   `populateDropdowns()`
    *   **Purpose**: Reads `categories.json` and `locations.json` to automatically fill the `<select>` options in the form, instead of hardcoding them in HTML.

### In `User-Website/js/search.js` (or similar inline scripts)
*   `filterProviders(category, location)`
    *   **Purpose**: When a user searches, this function filters the huge list of JSON data down to only the providers matching the chosen category and location.

---

## 📝 4. JSDoc (Reading the Code)

In the `.js` files, you will notice comments above functions that look like this:

```javascript
/**
 * Filters the list of providers based on search criteria.
 * @param {string} category - The selected service category.
 * @param {string} location - The selected city/location.
 * @returns {Array} List of matching provider objects.
 */
function filterProviders(category, location) { ... }
```

This is called **JSDoc**.
*   **Why it's useful**: If you hover your mouse over `filterProviders` anywhere in your VS Code editor, it will pop up a box explaining exactly what the function does, what inputs (`@param`) it needs, and what it gives back (`@returns`). This saves you from having to read the entire function code to understand it!

---
*If you need to add a new feature, always refer back to this guide to see where it belongs!*
