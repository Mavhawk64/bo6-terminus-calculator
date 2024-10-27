let selectedVariables = { X: null, Y: null, Z: null };
let currentVariable = 'X';

// Define colors for each variable
const colors = { X: 'red', Y: 'green', Z: 'blue' };

function selectOrbital(element) {
    const value = parseInt(element.getAttribute("data-value"));
    const id = element.id;

    // Check if this orbital is already selected
    let variableToDeselect = null;
    for (const [key, selectedId] of Object.entries(selectedVariables)) {
        if (selectedId === id) {
            variableToDeselect = key;
            break;
        }
    }

    if (variableToDeselect) {
        // Deselect the current orbital
        deselectOrbital(variableToDeselect);
        currentVariable = variableToDeselect; // Set to deselected variable to reassign
    } else if (currentVariable && !selectedVariables[currentVariable]) {
        // Assign the current variable to the selected orbital
        selectedVariables[currentVariable] = id;
        element.style.outline = `3px solid ${colors[currentVariable]}`;
        element.innerHTML += `<span class="variable-label" style="color: ${colors[currentVariable]}">${currentVariable}</span>`;

        // Update to the next variable (X -> Y -> Z)
        currentVariable = nextVariable();
    }

    // Calculate code automatically after each selection/deselection
    calculateCode();
}

function deselectOrbital(variable) {
    const id = selectedVariables[variable];
    const element = document.getElementById(id);
    element.style.outline = "none";
    element.innerHTML = element.innerHTML.replace(
        new RegExp(`<span class="variable-label"[^>]*>${variable}</span>`),
        ""
    );
    selectedVariables[variable] = null;

    // Set the deselected variable as the currentVariable to allow reassignment
    if (!currentVariable) {
        currentVariable = variable;
    }
}

function nextVariable() {
    if (!selectedVariables.X) return 'X';
    if (!selectedVariables.Y) return 'Y';
    if (!selectedVariables.Z) return 'Z';
    return null; // No next variable if all are selected
}

function calculateCode() {
    const X = parseInt(document.getElementById(selectedVariables.X)?.getAttribute("data-value")) || 0;
    const Y = parseInt(document.getElementById(selectedVariables.Y)?.getAttribute("data-value")) || 0;
    const Z = parseInt(document.getElementById(selectedVariables.Z)?.getAttribute("data-value")) || 0;

    const code1 = 2 * X + 11;
    const code2 = (2 * Z + Y) - 5;
    const code3 = Math.abs((Y + Z) - X);

    // Display all results on a single line in the CRT display
    document.getElementById("code-line").textContent = `${code1} ${code2} ${code3}`;
}
