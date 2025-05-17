
import { useEffect, useState } from 'react';
import axios from 'axios';

function InvoiceDashboard({ token, onLogout }) {
  const [invoices, setInvoices] = useState([]);
  const [number, setNumber] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [search, setSearch] = useState('');

  const fetchInvoices = () => {
    axios.get('/invoices', {
      headers: { Authorization: `Bearer ${token}` },
      params: { search }
    })
      .then(res => setInvoices(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchInvoices();
  }, [token, search]);

  const handleCreate = () => {
    axios.post('/invoices', {
      invoiceNumber: Number(number),
      invoiceDate: date,
      amount: Number(amount),
    }, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        setNumber(''); setDate(''); setAmount('');
        fetchInvoices();
      });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Invoices</h2>
        <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>

      <div className="mb-4">
        <input className="border p-2 mr-2 rounded" placeholder="Search by number" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <input className="border p-2 rounded" placeholder="Invoice #" value={number} onChange={(e) => setNumber(e.target.value)} />
        <input className="border p-2 rounded" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input className="border p-2 rounded" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, i) => (
              <tr key={inv._id} className="hover:bg-gray-50">
                <td className="p-2 border">{inv.invoiceNumber}</td>
                <td className="p-2 border">{new Date(inv.invoiceDate).toLocaleDateString()}</td>
                <td className="p-2 border">${inv.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InvoiceDashboard;