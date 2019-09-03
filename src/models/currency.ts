import mongoose, { Schema } from 'mongoose';

const CurrencySchema = new Schema({
    code: { type: String },
    name: { type: String },
    exchangeRate: { type: Number }
})

CurrencySchema.index({ code: 1 }, { unique: true });

export const CurrencyModel = mongoose.model('Currency', CurrencySchema);
export default CurrencyModel;
