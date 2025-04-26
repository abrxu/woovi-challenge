import mongoose, { Document, Model } from 'mongoose';

export interface IAccount extends Document {
  accountId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  balanceCents: number;
  createdAt: Date;
  updatedAt: Date;
}

const accountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  balance: { type: Number, required: true, default: 0 },
}, {
  timestamps: true
});

accountSchema.index({ email: 1 }, { unique: true });
accountSchema.index({ balanceCents: 1 });

const AccountModel: Model<IAccount> = mongoose.model<IAccount>('Account', accountSchema);
export default AccountModel;