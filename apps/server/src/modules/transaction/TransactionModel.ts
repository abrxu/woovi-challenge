import mongoose, { Document, Model } from 'mongoose';

export interface ITransaction extends Document {
  accountId: mongoose.Types.ObjectId;
  type: 'withdraw' | 'transfer';
  amountCents: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
    index: true
  },
  type: {
    type: String,
    enum: ['withdraw', 'transfer'],
    required: true
  },
  amountCents: {
    type: Number,
    required: true,
    min: 0 
  },
  currency: {
    type: String,
    required: true,
    enum: ['BRL'],
    length: 3
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
    index: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true,
  writeConcern: { // define write concern no nível do schema (pode ser sobrescrito em transações)
    w: 'majority'
  }
});

// index composto pra consultas frequentes
transactionSchema.index({ createdAt: -1 });
transactionSchema.index({ accountId: 1, status: 1 });

const TransactionModel: Model<ITransaction> = mongoose.model<ITransaction>('Transaction', transactionSchema);
export default TransactionModel;