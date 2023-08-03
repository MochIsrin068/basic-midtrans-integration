import express from "express";
import midtransClient from "midtrans-client";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/process-transaction", (req, res) => {
  try {
    // Create Snap API instance
    const snap = new midtransClient.Snap({
      isProduction: process.env.IS_PRODUCTION,
      serverKey: process.env.SERVER_KEY,
      clientKey: process.env.CLIENT_KEY,
    });

    const parameter = {
      transaction_details: {
        order_id: req.body.orderId,
        gross_amount: req.body.amount,
      },
      customer_details: {
        first_name: req.body.name,
      },
    };

    snap.createTransaction(parameter).then((transaction) => {
      // transaction token
      const transactionToken = transaction.token;
      const dataPayment = {
        response: JSON.stringify(transaction),
      };

      res.status(200).json({
        message: "Successfully",
        dataPayment,
        token: transactionToken,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
