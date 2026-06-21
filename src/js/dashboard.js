import { getSummary } from './storage.js';

const totalSaldo = document.getElementById('totalSaldo');
const totalPemasukan = document.getElementById('totalPemasukan');
const totalPengeluaran = document.getElementById('totalPengeluaran');
const summaryChart = document.getElementById('summaryChart');

const { pemasukan, pengeluaran, total } = getSummary();

// Update Summary Cards
if (totalSaldo) totalSaldo.textContent = `Rp ${total.toLocaleString('id-ID')}`;
if (totalPemasukan)
  totalPemasukan.textContent = `+Rp ${pemasukan.toLocaleString('id-ID')}`;
if (totalPengeluaran)
  totalPengeluaran.textContent = `-Rp ${pengeluaran.toLocaleString('id-ID')}`;

// Chart
if (summaryChart) {
  new Chart(summaryChart, {
    type: 'pie',
    data: {
      labels: ['Pemasukan', 'Pengeluaran'],
      datasets: [
        {
          data: [pemasukan, pengeluaran],
          backgroundColor: ['#00ADB5', '#FF2E63'],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'right' },
      },
    },
  });
}
