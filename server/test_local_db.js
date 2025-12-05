const mongoose = require('mongoose');

const testLocal = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/test_connection', { serverSelectionTimeoutMS: 2000 });
        console.log('Local MongoDB is available');
        process.exit(0);
    } catch (error) {
        console.log('Local MongoDB is NOT available');
        process.exit(1);
    }
};

testLocal();
