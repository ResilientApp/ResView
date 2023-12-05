import React, { useState } from 'react';

const TransactionForm = () => {
  const [transactionType, setTransactionType] = useState('');
  const [customTransaction, setCustomTransaction] = useState('');

  return (
    <div className="bg-gray-800 text-white p-20 rounded-lg w-350 mx-auto text-center">
      <div className="text-3xl mb-8">Choose:</div>
      <div className="mb-8">
        <label className="block text-xl mb-2">
          <input
            type="radio"
            value="select"
            checked={transactionType === 'select'}
            onChange={() => {
              setTransactionType('select');
              setCustomTransaction(''); // Reset customTransaction when "Select Transaction" is selected
            }}
            className="mr-2"
          />
          Select Transaction
        </label>
        <label className="block text-xl mb-2">
          <input
            type="radio"
            value="get"
            checked={transactionType === 'get'}
            onChange={() => {
              setTransactionType('get');
              setCustomTransaction(''); // Reset customTransaction when "Get Transaction" is selected
            }}
            className="mr-2"
          />
          Get Transaction
        </label>
        <label className="block text-xl">
          <input
            type="radio"
            value="set"
            checked={transactionType === 'set'}
            onChange={() => {
              setTransactionType('set');
              setCustomTransaction(''); // Reset customTransaction when "Set Transaction" is selected
            }}
            className="mr-2"
          />
          Set Transaction
        </label>
      </div>

      {transactionType === 'get' && (
        <div className="mb-4">
          <label className="block text-xl mb-2">Key:</label>
          <input type="text" name="key" className="bg-gray-700 border border-gray-600 px-4 py-2 rounded-md text-white" />
        </div>
      )}
      {transactionType === 'set' && (
        <>
          <div className="mb-4">
            <label className="block text-xl mb-2">Key:</label>
            <input type="text" name="key" className="bg-gray-700 border border-gray-600 px-4 py-2 rounded-md text-white" />
          </div>
          <div className="mb-4">
            <label className="block text-xl mb-2">Value:</label>
            <input type="text" name="value" className="bg-gray-700 border border-gray-600 px-4 py-2 rounded-md text-white" />
          </div>
        </>
      )}
      {transactionType === 'select' && (
        <div className="mb-4">
          <label className="block text-xl mb-2">Enter Transaction ID:</label>
          <input
            type="text"
            name="customTransaction"
            value={customTransaction}
            onChange={(e) => setCustomTransaction(e.target.value)}
            className="bg-gray-700 border border-gray-600 px-4 py-2 rounded-md text-white"
          />
        </div>
      )}
      {transactionType && (
        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-600 border border-teal-600 px-6 py-3 rounded-md text-white text-xl transition duration-300"
        >
          CONFIRM
        </button>
      )}
    </div>
  );
};

export default TransactionForm;
