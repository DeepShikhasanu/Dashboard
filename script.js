document.addEventListener("DOMContentLoaded", () => {
    const addProjectBtn = document.getElementById("add-project-btn");
    const tableBody = document.getElementById("table-body");
    const sidebarToggle = document.getElementById("sidebar-toggle");
    const sidebar = document.querySelector(".sidebar");
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const searchInput = document.getElementById("search-input");
    
    // Dark Mode Toggle
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Sidebar Toggle
    sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
    });

    // Add new row to table
    addProjectBtn.addEventListener("click", () => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td contenteditable="true">New User</td>
            <td contenteditable="true">newuser${Math.floor(Math.random() * 100)}@email.com</td>
            <td contenteditable="true">User</td>
            <td>${new Date().toLocaleDateString()}</td>
            <td class="status pending">Pending</td>
        `;
        tableBody.appendChild(newRow);
    });

    // Real-time Data Fetching (Mock API for demonstration)
    async function fetchUserData() {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();
        tableBody.innerHTML = "";
        users.forEach(user => {
            const statusTypes = ["Approved", "Pending", "Rejected"];
            const randomStatus = statusTypes[Math.floor(Math.random() * statusTypes.length)];
            const row = document.createElement("tr");
            row.innerHTML = `
                <td contenteditable="true">${user.name}</td>
                <td contenteditable="true">${user.email}</td>
                <td contenteditable="true">User</td>
                <td>${new Date().toLocaleDateString()}</td>
                <td class="status ${randomStatus.toLowerCase()}">${randomStatus}</td>
            `;
            tableBody.appendChild(row);
        });
    }
    fetchUserData();

    // Table Sorting
    document.querySelectorAll("th").forEach(header => {
        header.addEventListener("click", () => {
            const column = header.cellIndex;
            const rows = Array.from(tableBody.querySelectorAll("tr"));
            const sortedRows = rows.sort((a, b) => {
                return a.cells[column].innerText.localeCompare(b.cells[column].innerText);
            });
            tableBody.innerHTML = "";
            sortedRows.forEach(row => tableBody.appendChild(row));
        });
    });

    // Table Search Filtering with "No results found"
    function filterTable() {
        const searchText = searchInput.value.toLowerCase();
        const rows = tableBody.querySelectorAll("tr");
        let found = false;

        rows.forEach(row => {
            if (row.innerText.toLowerCase().includes(searchText)) {
                row.style.display = "";
                found = true;
            } else {
                row.style.display = "none";
            }
        });

        // If no matches found, show "No results found" row
        let noResultRow = document.getElementById("no-results");
        if (!found) {
            if (!noResultRow) {
                noResultRow = document.createElement("tr");
                noResultRow.id = "no-results";
                noResultRow.innerHTML = `<td colspan="5" style="text-align:center; color: red;">No results found</td>`;
                tableBody.appendChild(noResultRow);
            }
        } else {
            if (noResultRow) {
                noResultRow.remove();
            }
        }
    }

    searchInput.addEventListener("input", filterTable);

    // Chart with updated animations
    const chartCanvas = document.getElementById("myChart");
    if (chartCanvas) {
        const ctx = chartCanvas.getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [{
                    label: "Performance",
                    data: [10, 20, 15, 30, 25, 40],
                    backgroundColor: ["#8e44ad", "#2980b9", "#e67e22", "#2ecc71", "#f1c40f", "#d35400"],
                    borderColor: "#2c3e50",
                    borderWidth: 1,
                }]
            },
            options: {
                responsive: true,
                animation: {
                    duration: 1000,
                    easing: "easeInOutBounce"
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: true,
                            color: "rgba(44, 62, 80, 0.2)"
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
});
