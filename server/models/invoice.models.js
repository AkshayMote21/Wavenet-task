import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: Number,
  invoiceDate: Date,
  amount: Number,
  financialYear: String,
  createdBy: String,
});

const Invoice = mongoose.model('Invoice', invoiceSchema);
export default Invoice;