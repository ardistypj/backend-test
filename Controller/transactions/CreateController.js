import moment from "moment";
import success from "../../Helper/Response/success.js";
import error_handling from "../../Helper/Response/error.js";
import { createTransaction } from "../../Services/transactionProducts/transactionProductsRepository.js";
import { createTransactionPayment } from "../../Services/transactionPayment/transactionPaymentRepository.js";
import { createTransactionProduct } from "../../Services/transactionProducts/transactionProductsRepository.js";
import { readProductById } from "../../Services/products/productsRepository.js";
import { validationResult } from "express-validator";

export default async function createOne(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return error_handling("Failed to add transaction data", 422, errors.array(), res);
    } else {
      const generateCode = (length) => {
        let result = 'TR';
        const characters ='0123456789';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      };

      var inputTransaction = {
        id: uuidv4(),
        transaction_code: generateCode(5),
        customer_id: req.body.customer_id,
        customer_address_id: req.body.m_satuan_id,
        employer_name: req.body.employer_name,
        status: true,
    };
      var products = req.body.products_id;  // Req Input Data Obat

      // Cek Data Obat required
      if (products == 0 || products === undefined) {
        return error_handling(
          "Failed to add transaction data",
          422,
          "Please insert product",
          res
        );
      } else {
        
        // Create Data Master Resep Dokter
        let createTransactionData = await createTransaction(
          inputTransaction
          );

          
          // Loop data pivot Resep Dokter Obat
          await loop(products, async (item) => {
          let getProducts = await readProductById(item.id);
          var transactionProduct = {
            id: uuidv4(),
            products_id: item.id,
            qty: item.qty,
            product_price: getProducts.price,
            total: item.qty*getProducts.price,
            transaction_id: createTransaction.id,
            };

          // Create Data Pivot 
          let createTransactionProducts = await createTransactionProduct(
            transactionProduct
          );

          var transactionPayment = {
            transaction_id: createTransaction.id,
            payment_method_id: item.payment_method_id,
            status: true,
          }

          let createTransactionPaymentData = await createTransactionPayment(
            transactionPayment
          );

        });

        var responseData = {
          id: uuidv4(),
          transaction_code: generateCode(5),
          customer_id: req.body.customer_id,
          customer_address_id: req.body.m_satuan_id,
          employer_name: req.body.employer_name,
          status: true,
          products: products,
          created_at: convertTZ(new Date(Date.now()), "Asia/Jakarta"),
          updated_at: convertTZ(new Date(Date.now()), "Asia/Jakarta")
        };

        return success("Success to add transaction data", 201, responseData, res);
      }
    }
  } catch (error) {
    return error_handling("Failed to add transaction data", 500, error.message, res);
  }
}

async function loop(items, callback) {
  for (var a = 0; a < items.length; a++) {
    // eslint-disable-next-line
    await callback(items[a]);
  }
}