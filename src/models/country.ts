import mongoose, { Schema } from 'mongoose';

const CountrySchema = new Schema({
    name: { type: String },
    region: { type: String },
    population: { type: Number },
    demonym: { type: String },
    area: { type: Number },
    currencies: [{ type: Schema.ObjectId, ref: 'Currency' }]
})

export const CountryModel = mongoose.model('Country', CountrySchema);
export default CountryModel;