/**
 * LocalServe - Provider Form Core Logic
 * ------------------------------------
 * This file contains shared functionality between the User application form 
 * and the Admin "Add Provider" form to ensure consistency and maintainability.
 */

// --- SHARED DATA ---

const allAvailableAreas = [
    "CTG Metropolitan Area", "GEC Circle", "Agrabad", "Halishahar", "Nasirabad", 
    "Chawkbazar", "Panchlaish", "Bakalia", "Khulshi", 
    "Patenga", "Kotwali", "Double Mooring", "EPZ Area",
    "Muradpur", "Bahaddarhat", "Lalkhan Bazar"
];

// NOTE: These variables must be declared in the global scope of the HTML file
// as they are used to track state within the specific form session.
// Expected globals: selectedAreas (Array), offeredServicesTags (Array), categoriesTags (Array), formCache (Object)

// --- VALIDATION & UTILS ---

/**
 * Updates the character count display for a given textarea input.
 * It also applies an error warning class if the maximum length is exceeded.
 * @param {string} inputId - The HTML ID of the `<textarea>` element.
 * @param {string} labelId - The HTML ID of the `<span>` or `<label>` displaying the count.
 * @param {number} [maxChars=300] - The maximum allowed characters before showing an error state.
 */
function updateCharCount(inputId, labelId, maxChars = 300) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    const text = input.value;
    const charCount = text.length;
    const label = document.getElementById(labelId);
    
    if (label) {
        label.innerText = `${charCount} / ${maxChars} characters`;
        if (charCount > maxChars) {
            label.classList.add('text-error', 'font-bold');
        } else {
            label.classList.remove('text-error', 'font-bold');
        }
    }
}

// --- AREA SEARCH LOGIC ---

/**
 * Initializes the area (location) search input behavior.
 * Attaches event listeners for typing, focusing, and clicking outside the dropdown container.
 */
function setupAreaSearch() {
    const input = document.getElementById('areaSearchInput');
    const dropdown = document.getElementById('areaDropdown');
    const section = document.getElementById('areaSearchSection');
    if(!input || !dropdown || !section) return;

    // Use property assignment to avoid duplicate listeners on the elements themselves
    input.onfocus = () => { if(dropdown) renderAreaDropdown(input.value); };
    input.oninput = () => { if(dropdown) renderAreaDropdown(input.value); };
    
    // Global click handler to close dropdown when clicking outside
    // Only add once to the document
    if (!window._hasAreaSearchListener) {
        document.addEventListener('click', (e) => {
            const currentDropdown = document.getElementById('areaDropdown');
            const currentSection = document.getElementById('areaSearchSection');
            if (currentDropdown && currentSection && !currentSection.contains(e.target)) {
                currentDropdown.classList.add('hidden');
            }
        });
        window._hasAreaSearchListener = true;
    }
}

function toggleAreaDropdown() {
    const dropdown = document.getElementById('areaDropdown');
    if (dropdown) dropdown.classList.toggle('hidden');
}

function renderAreaDropdown(query = '') {
    const dropdown = document.getElementById('areaDropdown');
    if (!dropdown) return;
    
    dropdown.innerHTML = '';
    
    const filtered = allAvailableAreas
        .filter(a => a.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => {
            const aMatch = a.toLowerCase().startsWith(query.toLowerCase());
            const bMatch = b.toLowerCase().startsWith(query.toLowerCase());
            if (aMatch && !bMatch) return -1;
            if (!aMatch && bMatch) return 1;
            return a.localeCompare(b);
        });

    if (filtered.length === 0) {
        dropdown.innerHTML = '<div class="p-4 text-center text-sm opacity-50 italic">No locations found</div>';
    } else {
        // Limit to 6 items as requested for a cleaner dropdown
        const displayLimit = 6;
        const visibleItems = filtered.slice(0, displayLimit);

        visibleItems.forEach(area => {
            const isSelected = selectedAreas.includes(area);
            const div = document.createElement('div');
            // Remove 'selected' class and use opacity/pointer-events for disabled look
            div.className = `dropdown-item ${isSelected ? 'opacity-30 pointer-events-none cursor-not-allowed mb-1' : 'cursor-pointer'}`;
            div.innerHTML = `
                <div class="flex justify-between items-center transition-all px-1">
                    <span class="${isSelected ? 'line-through decoration-1 text-base-content/50' : 'font-medium'}">${area}</span>
                </div>
            `;
            if (!isSelected) {
                div.onclick = () => selectArea(area);
            }
            dropdown.appendChild(div);
        });
    }
    dropdown.classList.remove('hidden');
}

function selectArea(area) {
    if (!selectedAreas.includes(area)) {
        selectedAreas.push(area);
        refreshAreaSelection();
        renderAreaDropdown(document.getElementById('areaSearchInput').value);
        // Trigger save if saveDraft exists (it will be checked inside the HTML file's listeners)
    }
}

function removeArea(area) {
    selectedAreas = selectedAreas.filter(a => a !== area);
    refreshAreaSelection();
    renderAreaDropdown(document.getElementById('areaSearchInput').value);
}

function refreshAreaSelection() {
    const container = document.getElementById('selectedAreasContainer');
    if (!container) return;
    
    container.innerHTML = '';
    if (selectedAreas.length === 0) {
        container.innerHTML = '<span class="text-sm opacity-40 italic py-2">No areas selected yet. Users will be more likely to find you if you select specific locations.</span>';
        return;
    }

    selectedAreas.forEach(area => {
        const badge = document.createElement('div');
        // Unified style: Dark Blue (bg-blue-700) with white text to match Working Days
        badge.className = 'badge bg-blue-700 text-white border-none badge-lg py-4 px-4 gap-2 font-bold shadow-sm transition-all hover:scale-105';
        badge.innerHTML = `
            <i class="fas fa-map-marker-alt text-xs opacity-70"></i>
            ${area}
            <i class="fas fa-times cursor-pointer hover:text-white/70 ml-1" onclick="removeArea('${area}')"></i>
        `;
        container.appendChild(badge);
    });
    
    // Global hook for draft saving (if exists in parent)
    if (typeof saveDraft === 'function') saveDraft();
}

// --- TAG INPUT LOGIC (Offered Services) ---

function setupTagInput() {
    const input = document.getElementById('tagInput');
    if(!input) return;

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            processTagInput();
        }
    });
}

/**
 * Processes the input from the tag field (services offered).
 * Splits input by comma, enforces a 6-word limit per tag, and adds valid tags to the global array.
 */
function processTagInput() {
    const input = document.getElementById('tagInput');
    if (!input) return;
    
    // Split by comma to allow multiple at once
    const values = input.value.split(',');
    let hasError = false;
    const errorLabel = document.getElementById('tagError');

    values.forEach(val => {
        val = val.trim();
        if (!val) return;
        
        const wordCount = val.split(/\s+/).length;
        if (wordCount > 6) {
            hasError = true;
        } else {
            if (!offeredServicesTags.includes(val)) {
                offeredServicesTags.push(val);
            }
        }
    });

    if (errorLabel) {
        if (hasError) errorLabel.classList.remove('hidden');
        else errorLabel.classList.add('hidden');
    }
    
    if (!hasError) {
        input.value = '';
    }
    
    refreshTags();
    if (typeof saveDraft === 'function') saveDraft();
}

function removeTag(index) {
    offeredServicesTags.splice(index, 1);
    refreshTags();
    if (typeof saveDraft === 'function') saveDraft();
}

function refreshTags() {
    const container = document.getElementById('tagContainer');
    if (!container) return;
    
    container.innerHTML = ''; 
    
    if (offeredServicesTags.length === 0) {
        container.innerHTML = '<span class="text-sm opacity-50 italic py-2">No services added yet.</span>';
        return;
    }

    offeredServicesTags.forEach((tagText, index) => {
        const badge = document.createElement('div');
        // Unified style: Dark Blue (bg-blue-700) with white text
        badge.className = 'badge bg-blue-700 text-white border-none badge-lg py-4 px-4 gap-2 font-bold shadow-sm transition-all hover:scale-105';
        badge.innerHTML = `
            <i class="fas fa-tag text-[10px] opacity-70"></i>
            ${tagText}
            <i class="fas fa-times cursor-pointer hover:text-white/70 ml-1" onclick="removeTag(${index})"></i>
        `;
        container.appendChild(badge);
    });
}

// --- CATEGORY TAG LOGIC ---

// --- CATEGORY SEARCH LOGIC (UPGRADED) ---

let allAvailableCategories = [];

/**
 * Fetches the list of available categories from the local JSON file.
 * If fetching fails, it provides a fallback set of hardcoded categories.
 * @returns {Promise<Array>} A promise that resolves to an array of category objects.
 */
async function fetchCategories() {
    if (allAvailableCategories.length > 0) return allAvailableCategories;
    try {
        const response = await fetch('../Admin-Dashboard/data/categories.json');
        allAvailableCategories = await response.json();
        return allAvailableCategories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback
        allAvailableCategories = [
            { name: "Home Repairs" },
            { name: "Cleaning" },
            { name: "Plumbing" },
            { name: "Electrical" }
        ];
        return allAvailableCategories;
    }
}

async function setupCategorySearch() {
    const input = document.getElementById('categorySearchInput');
    const dropdown = document.getElementById('categoryDropdown');
    const section = document.getElementById('categorySearchSection');
    if(!input || !dropdown || !section) return;

    // Ensure categories are loaded
    await fetchCategories();

    input.onfocus = () => renderCategoryDropdown(input.value);
    input.oninput = () => renderCategoryDropdown(input.value);
    
    if (!window._hasCategorySearchListener) {
        document.addEventListener('click', (e) => {
            const currentDropdown = document.getElementById('categoryDropdown');
            const currentSection = document.getElementById('categorySearchSection');
            if (currentDropdown && currentSection && !currentSection.contains(e.target)) {
                currentDropdown.classList.add('hidden');
            }
        });
        window._hasCategorySearchListener = true;
    }
}

function toggleCategoryDropdown() {
    const dropdown = document.getElementById('categoryDropdown');
    if (dropdown) dropdown.classList.toggle('hidden');
}

function renderCategoryDropdown(query = '') {
    const dropdown = document.getElementById('categoryDropdown');
    if (!dropdown) return;
    
    dropdown.innerHTML = '';
    
    const filtered = allAvailableCategories
        .filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name));

    if (filtered.length === 0) {
        dropdown.innerHTML = '<div class="p-4 text-center text-sm opacity-50 italic">No categories found</div>';
    } else {
        const displayLimit = 6;
        const visibleItems = filtered.slice(0, displayLimit);

        visibleItems.forEach(cat => {
            const isSelected = categoriesTags.includes(cat.name);
            const div = document.createElement('div');
            div.className = `dropdown-item ${isSelected ? 'opacity-30 pointer-events-none cursor-not-allowed mb-1' : 'cursor-pointer'}`;
            div.innerHTML = `
                <div class="flex justify-between items-center transition-all px-1">
                    <span class="${isSelected ? 'line-through decoration-1 text-base-content/50' : 'font-medium'}">${cat.name}</span>
                </div>
            `;
            if (!isSelected) {
                div.onclick = () => selectCategory(cat.name);
            }
            dropdown.appendChild(div);
        });
    }
    dropdown.classList.remove('hidden');
}

function selectCategory(category) {
    if (!categoriesTags.includes(category)) {
        categoriesTags.push(category);
        refreshCategoryTags();
        renderCategoryDropdown(document.getElementById('categorySearchInput').value);
    }
}

function removeCategoryTag(category) {
    categoriesTags = categoriesTags.filter(c => c !== category);
    refreshCategoryTags();
    if (document.getElementById('categorySearchInput')) {
        renderCategoryDropdown(document.getElementById('categorySearchInput').value);
    }
    if (typeof saveDraft === 'function') saveDraft();
}

function refreshCategoryTags() {
    const container = document.getElementById('categoryTagContainer');
    if (!container) return;
    
    container.innerHTML = ''; 
    
    if (categoriesTags.length === 0) {
        container.innerHTML = '<span class="text-xs opacity-50 italic py-2">No categories selected yet. Click search bar to see options.</span>';
        return;
    }

    categoriesTags.forEach((tagText) => {
        const badge = document.createElement('div');
        badge.className = 'badge bg-blue-700 text-white border-none badge-lg py-4 px-4 gap-2 font-bold shadow-sm transition-all hover:scale-105';
        badge.innerHTML = `
            <i class="fas fa-th-large text-[10px] opacity-70"></i>
            ${tagText}
            <i class="fas fa-times cursor-pointer hover:text-white/70 ml-1" onclick="removeCategoryTag('${tagText}')"></i>
        `;
        container.appendChild(badge);
    });
    
    if (typeof saveDraft === 'function') saveDraft();
}
