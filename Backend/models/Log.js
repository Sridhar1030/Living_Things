// models/Log.js
import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
    accessTime: String,
    accessDate: Date,
    employeeName: String,
    algoStatus: String,
});

const Log = mongoose.model('Log', logSchema);

export default Log;
