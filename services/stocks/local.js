/**
 * Function to insert a stock transaction.
 *
 * @param transactionData
 * @param transactions
 */
export const insertStockTransaction = (transactionData, transactions) => {
  const requiredCryptoTransactionKeys = [
    "symbol",
    "quantity",
    "orderValue",
    "timestamp",
    "type",
  ];

  let valid = true;
  const values = {};

  requiredCryptoTransactionKeys.forEach((requiredKey) => {
    if (transactionData[requiredKey]) {
      values[requiredKey] = transactionData[requiredKey];
    } else {
      valid = false;
    }
  });

  if (valid) {
    return [...transactions, values];
  }

  return false;
};
