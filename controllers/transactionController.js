const axios = require('axios');
const Booking = require('./../models/bookingModel');

const INIT_PAYMENT = 'https://api.paystack.co/transaction/initialize';
const VERIFY_PAYMENT = 'https://api.paystack.co/transaction/verify';

exports.initPayment = async (req, res, next) => {
  const { email, amount, callback_url, room, price, user } = req.body;

  try {
    const { data } = await axios.post(
      INIT_PAYMENT,
      {
        email,
        amount,
        callback_url
      },
      {
        headers: {
          Authorization: `Bearer sk_test_2d7c49d1163ac466d9cc7bd27672e21f1d440e51`
        }
      }
    );

    //create booking history
    const { reference } = data.data;
    await Booking.create({
      room,
      price,
      user,
      reference
    });

    res.status(200).json({
      status: 'success',
      data: {
        data: data,
        error: null
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      data: {
        data: null,
        error: error
      }
    });
  }
};

exports.verifyPayment = async (req, res, next) => {
  try {
    //verify payment
    const { data } = await axios.get(
      `${VERIFY_PAYMENT}/${req.body.reference}`,
      {
        headers: {
          Authorization: `Bearer sk_test_2d7c49d1163ac466d9cc7bd27672e21f1d440e51`
        }
      }
    );

    await Booking.findOneAndUpdate(
      { reference: req.body.reference },
      { paid: true }
    );
    res.status(200).json({
      status: 'success',
      data: {
        data: data,
        error: null
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      data: {
        data: null,
        error: error
      }
    });
  }
};
