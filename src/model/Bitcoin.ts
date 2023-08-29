import * as mongoose from 'mongoose';

export const BitcoinSchema = new mongoose.Schema({
  time_period_start: { type: String, required: true },
  time_period_end: { type: String, required: true },
  time_open: { type: String },
  time_close: { type: String },
  price_open: { type: Number, required: true },
  price_high: { type: Number, required: true },
  price_low: { type: Number, required: true },
  price_close: { type: Number, required: true },
});

export type Bitcoin = {
  time_period_start: number;
  time_period_end: number;
  time_open: number;
  time_close: number;
  price_open: number;
  price_high: number;
  price_low: number;
  price_close: number;
};
