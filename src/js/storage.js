export const STORAGE_KEY = 'mtracker_data';

// Mengambil semua data transaksi
export const getTransaction = () => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  return data;
};

// Menambah transaksi baru
export function createTransaction(name, category, nominal) {
  const data = getTransaction();

  const transaction = {
    nama: name,
    kategori: category,
    nominal: Number(nominal),
  };

  data.push(transaction);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function updateTransaction(index, name, category, nominal) {
  const data = getTransaction();
  data[index] = {
    nama: name,
    kategori: category,
    nominal: Number(nominal),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Menghapus transaksi berdasarkan index
export function deleteTransaction(index) {
  const data = getTransaction();
  data.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Menghitung ringkasan (total saldo, pemasukan, pengeluaran)
export function getSummary() {
  const data = getTransaction();

  const pemasukan = data
    .filter((item) => item.kategori === 'pemasukan')
    .reduce((sum, item) => sum + item.nominal, 0);

  const pengeluaran = data
    .filter((item) => item.kategori === 'pengeluaran')
    .reduce((sum, item) => sum + item.nominal, 0);

  return {
    pemasukan,
    pengeluaran,
    total: pemasukan - pengeluaran,
  };
}
