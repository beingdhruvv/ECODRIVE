// Sample EV data
const evData = [
    {
        model: 'Tesla Model 3',
        range: 576,  // 358 miles * 1.60934
        price: 4471000,
        fastCharging: '20 min (10-80%)',
        efficiency: '6.4 km/kWh',  // 4.0 * 1.60934
        category: 'sedan'
    },
    {
        model: 'Tesla Model Y',
        range: 533,  // 331 miles * 1.60934
        price: 4679000,
        fastCharging: '20 min (10-80%)',
        efficiency: '6.0 km/kWh',  // 3.7 * 1.60934
        category: 'suv'
    },
    {
        model: 'BMW i4',
        range: 587,  // 365 miles * 1.60934
        price: 5346000,
        fastCharging: '31 min (10-80%)',
        efficiency: '6.1 km/kWh',  // 3.8 * 1.60934
        category: 'sedan'
    },
    {
        model: 'BMW iX',
        range: 612,  // 380 miles * 1.60934
        price: 7270000,
        fastCharging: '35 min (10-80%)',
        efficiency: '5.1 km/kWh',  // 3.2 * 1.60934
        category: 'suv'
    },
    {
        model: 'Kia EV6',
        range: 528,  // 328 miles * 1.60934
        price: 4675000,
        fastCharging: '18 min (10-80%)',
        efficiency: '5.8 km/kWh',  // 3.6 * 1.60934
        category: 'suv'
    },
    {
        model: 'Hyundai IONIQ 5',
        range: 507,  // 315 miles * 1.60934
        price: 4358000,
        fastCharging: '18 min (10-80%)',
        efficiency: '6.0 km/kWh',  // 3.7 * 1.60934
        category: 'suv'
    },
    {
        model: 'Volkswagen ID.3',
        range: 423,  // 263 miles * 1.60934
        price: 3764000,
        fastCharging: '30 min (10-80%)',
        efficiency: '6.8 km/kWh',  // 4.2 * 1.60934
        category: 'hatchback'
    },
    {
        model: 'Volkswagen ID.4',
        range: 499,  // 310 miles * 1.60934
        price: 4367000,
        fastCharging: '38 min (10-80%)',
        efficiency: '5.6 km/kWh',  // 3.5 * 1.60934
        category: 'suv'
    },
    {
        model: 'Polestar 2',
        range: 541,  // 336 miles * 1.60934
        price: 4670000,
        fastCharging: '35 min (10-80%)',
        efficiency: '5.8 km/kWh',  // 3.6 * 1.60934
        category: 'sedan'
    },
    {
        model: 'Mercedes EQS',
        range: 729,  // 453 miles * 1.60934
        price: 10711000,
        fastCharging: '31 min (10-80%)',
        efficiency: '6.0 km/kWh',  // 3.7 * 1.60934
        category: 'sedan'
    },
    {
        model: 'Audi e-tron GT',
        range: 480,  // 298 miles * 1.60934
        price: 10390000,
        fastCharging: '22 min (10-80%)',
        efficiency: '5.3 km/kWh',  // 3.3 * 1.60934
        category: 'sedan'
    },
    {
        model: 'Porsche Taycan',
        range: 484,  // 301 miles * 1.60934
        price: 8778000,
        fastCharging: '22 min (10-80%)',
        efficiency: '5.1 km/kWh',  // 3.2 * 1.60934
        category: 'sedan'
    },
    {
        model: 'Ford Mustang Mach-E',
        range: 502,  // 312 miles * 1.60934
        price: 4783000,
        fastCharging: '45 min (10-80%)',
        efficiency: '5.5 km/kWh',  // 3.4 * 1.60934
        category: 'suv'
    },
    {
        model: 'Nissan Ariya',
        range: 529,  // 329 miles * 1.60934
        price: 4560000,
        fastCharging: '35 min (10-80%)',
        efficiency: '5.8 km/kWh',  // 3.6 * 1.60934
        category: 'suv'
    },
    {
        model: 'Renault Megane E-Tech',
        range: 451,  // 280 miles * 1.60934
        price: 3847000,
        fastCharging: '37 min (10-80%)',
        efficiency: '6.1 km/kWh',  // 3.8 * 1.60934
        category: 'hatchback'
    },
    {
        model: 'Skoda Enyaq iV',
        range: 529,  // 329 miles * 1.60934
        price: 4053000,
        fastCharging: '36 min (10-80%)',
        efficiency: '5.6 km/kWh',  // 3.5 * 1.60934
        category: 'suv'
    },
    {
        model: 'Volvo C40 Recharge',
        range: 507,  // 315 miles * 1.60934
        price: 4898000,
        fastCharging: '37 min (10-80%)',
        efficiency: '5.6 km/kWh',  // 3.5 * 1.60934
        category: 'suv'
    },
    {
        model: 'Cupra Born',
        range: 539,  // 335 miles * 1.60934
        price: 3793000,
        fastCharging: '35 min (10-80%)',
        efficiency: '6.4 km/kWh',  // 4.0 * 1.60934
        category: 'hatchback'
    }
];

// Populate comparison table
function populateComparisonTable(data) {
    const tableBody = document.getElementById('comparisonTableBody');
    tableBody.innerHTML = '';
    document.querySelector('.comparison-table thead tr').innerHTML = `
        <th>Model</th><th data-tooltip="Maximum distance on a single charge">Range (km)</th>
        <th data-tooltip="Starting price before incentives">Price (₹)</th>
        <th data-tooltip="Time to charge from 10% to 80%">Fast Charging</th>
        <th data-tooltip="Energy consumption per kilometer">Efficiency (km/kWh)</th>`;
    data.forEach(ev => tableBody.innerHTML += `<tr><td>${ev.model}</td><td>${Math.round(ev.range)}</td>
        <td>₹${ev.price.toLocaleString('en-IN')}</td><td>${ev.fastCharging}</td><td>${ev.efficiency}</td></tr>`);
}

// Search and filter functionality
function filterAndSortData() {
    const searchTerm = document.getElementById('modelSearch').value.toLowerCase();
    const category = document.getElementById('filterCategory').value;
    return evData.filter(ev => ev.model.toLowerCase().includes(searchTerm) && 
        (category === 'all' || ev.category === category));
}

// Sort functionality
let currentSort = { field: null, ascending: true };

function sortData(data, field) {
    currentSort = { field, ascending: currentSort.field === field ? !currentSort.ascending : true };
    return data.sort((a, b) => {
        let comparison = a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
        return currentSort.ascending ? comparison : -comparison;
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initial table population
    populateComparisonTable(evData);

    // Search and filter events
    ['modelSearch', 'filterCategory'].forEach(id => 
        document.getElementById(id).addEventListener('input', () => populateComparisonTable(filterAndSortData())));

    // Sort buttons
    document.querySelectorAll('.sort-btn').forEach(button => {
        button.addEventListener('click', () => {
            const field = button.dataset.sort;
            populateComparisonTable(sortData(filterAndSortData(), field));
            document.querySelectorAll('.sort-btn').forEach(btn => btn.classList.remove('sort-asc', 'sort-desc'));
            button.classList.add(currentSort.ascending ? 'sort-asc' : 'sort-desc');
        });
    });

    // Collapsible panels
    document.querySelectorAll('.panel-header').forEach(header => {
        header.addEventListener('click', () => {
            const panel = header.parentElement, content = panel.querySelector('.panel-content');
            panel.classList.toggle('active');
            header.querySelector('.panel-icon').textContent = panel.classList.contains('active') ? '−' : '+';
            content.style.maxHeight = panel.classList.contains('active') ? content.scrollHeight + 'px' : '0';
        });
    });

    // Tooltips
    document.querySelectorAll('[data-tooltip]').forEach(element => {
        ['mouseenter', 'mouseleave'].forEach(event => element.addEventListener(event, e => {
            if (event === 'mouseenter') {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = element.dataset.tooltip;
                document.body.appendChild(tooltip);
                const rect = element.getBoundingClientRect();
                tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
                tooltip.style.left = rect.left + (rect.width - tooltip.offsetWidth) / 2 + 'px';
            } else document.querySelector('.tooltip')?.remove();
        }));
    });
});

// Add smooth animations to charging type cards
document.querySelectorAll('.charging-type').forEach(card => {
    ['mouseenter', 'mouseleave'].forEach(event => 
        card.addEventListener(event, () => card.classList.toggle('hover')));
}); 