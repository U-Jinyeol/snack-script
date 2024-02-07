import mongoose from 'mongoose';

const connect = () => {
  mongoose.connect(process.env.MONGO_DB_URL).catch((err) => console.log(err));
};

mongoose.connection.on('error', (err) => {
  console.error('몽고디비 연결 에러', err);
});

export default connect;
