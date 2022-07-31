const axios = require('axios');
const Booking = require('./../models/bookingModel');

const INIT_PAYMENT = 'https://api.paystack.co/transaction/initialize';
const VERIFY_PAYMENT = 'https://api.paystack.co/transaction/verify';

exports.initPayment = async (req, res, next) => {
  const { email, amount, callback_url, room, price, user } = req.body;
  console.log('reference-data', req.body);

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
          Authorization: `Bearer sk_test_bf8ff3737da24ed599398fe5c7071ae6209e9c54`
        }
      }
    );
    console.log('reference-data', data);
    console.log('reference-data', user, room);

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
    console.log('error', error);

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
    console.log('requestPayload', req.body);
    const { data } = await axios.get(
      `${VERIFY_PAYMENT}/${req.body.reference}`,
      {
        headers: {
          Authorization: `Bearer sk_test_bf8ff3737da24ed599398fe5c7071ae6209e9c54`
        }
      }
    );

    console.log('data', data);

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
