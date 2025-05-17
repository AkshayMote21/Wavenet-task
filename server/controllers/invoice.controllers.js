import Invoice from '../models/invoice.models.js';

export const createInvoice = async (req, res) => {
  return res.send("Hello-invoice");
  const { invoiceNumber, invoiceDate, amount } = req.body;
  const user = req.user;

  const date = new Date(invoiceDate);
  const fy = date.getMonth() < 3 ? `${date.getFullYear() - 1}-${date.getFullYear()}` : `${date.getFullYear()}-${date.getFullYear() + 1}`;

  const invoice = new Invoice({
    invoiceNumber,
    invoiceDate: new Date(invoiceDate),
    amount,
    financialYear: fy,
    createdBy: user.userId,
  });

  await invoice.save();
  res.json(invoice);
};
