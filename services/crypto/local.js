/**
 * Function to insert a crypto transaction.
 *
 * @param transactionData
 * @param transactions
 */
export const insertCryptoTransaction = (transactionData, transactions) => {
  const requiredCryptoTransactionKeys = [
    "currency",
    "quantity",
    "orderValue",
    "timestamp",
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
