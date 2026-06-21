import {
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from './storage.js';

const transactionForm = document.getElementById('transactionForm');
const transactionBody = document.getElementById('transactionBody');
let editingIndex = null;

// Memunculkan Notifikasi
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.remove('hidden', 'translate-x-10', 'opacity-0');

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-x-10');
    setTimeout(() => toast.classList.add('hidden'), 300);
  }, 2000);
}

// Render Table
function renderTable() {
  transactionBody.innerHTML = '';
  const data = getTransaction();

  data.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.setAttribute('class', 'transition-colors hover:bg-gray-50');

    tr.innerHTML = /* html */ `
      <td class="border-b border-gray-100 px-3 py-2.5 text-gray-500">
        ${index + 1}
      </td>
      <td class="border-b border-gray-100 px-3 py-2.5">
        ${item.nama}
      </td>
      <td class="border-b border-gray-100 px-3 py-2.5 text-right font-medium ${item.kategori === 'pemasukan' ? 'text-green-600' : 'text-red-600'}">
       ${item.kategori === 'pemasukan' ? '+' : '-'} Rp ${item.nominal.toLocaleString('id-ID')}
      </td>
      <td class="border-b border-gray-100 px-3 py-2.5 text-center">
          <button class="mr-2 cursor-pointer text-gray-500 hover:text-blue-600" title="edit" data-action="edit" data-index="${index}">
            <i class="ti ti-edit"></i>
          </button>
          <button class="cursor-pointer text-gray-500 hover:text-red-600" title="delete" data-action="delete" data-index="${index}">
            <i class="ti ti-trash"></i>
          </button>
      </td>
    `;

    transactionBody.appendChild(tr);
  });
}

// Submit form -> tambah transaksi
transactionForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nameTransaction = document.getElementById('name').value;
  const categoryTransaction = document.querySelector(
    'input[name="jenis"]:checked',
  ).value;
  const nominalTransaction = document.getElementById('nominal').value;

  if (editingIndex !== null) {
    updateTransaction(
      editingIndex,
      nameTransaction,
      categoryTransaction,
      nominalTransaction,
    );
    showToast('Transaksi berhasil diperbarui!');
    editingIndex = null; // reset balik ke mode tambah
  } else {
    createTransaction(nameTransaction, categoryTransaction, nominalTransaction);
    showToast('Transaksi berhasil ditambahkan!');
  }

  transactionForm.reset();
  renderTable();
});

// Event delegation untuk tombol edit & delete
transactionBody.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;

  const index = Number(btn.dataset.index);

  if (btn.dataset.action === 'edit') {
    editTransaction(index);
  }

  if (btn.dataset.action === 'delete') {
    deleteTransaction(index);
    showToast('Transaksi berhasil dihapus!');
    renderTable();
  }
});

// Edit Transaction
function editTransaction(index) {
  const data = getTransaction();
  const item = data[index];

  document.getElementById('name').value = item.nama;
  document.getElementById('nominal').value = item.nominal;

  const radioToCheck = document.querySelector(
    `input[name="jenis"][value="${item.kategori}"]`,
  );
  if (radioToCheck) radioToCheck.checked = true;

  editingIndex = index;
}

renderTable();
