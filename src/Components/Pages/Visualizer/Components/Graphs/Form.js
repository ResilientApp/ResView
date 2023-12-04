import React, { useState } from 'react';

const TransactionForm = () => {
  const [transactionType, setTransactionType] = useState('');

  const styles = {
    formContainer: {
      backgroundColor: '#333',
      color: 'white',
      padding: '20px',
      borderRadius: '8px',
      width: '700px',
      height: '400px',
      margin: 'auto',
      textAlign: 'center', // Center align the content
    },
    heading: {
      fontSize: '30px',
      marginBottom: '20px', // Add spacing between the heading and options
    },
    label: {
      marginRight: '20px',
      fontSize: '18px',
    },
    input: {
      backgroundColor: '#222',
      border: '1px solid #555',
      borderRadius: '4px',
      color: 'white',
      padding: '8px 12px',
      margin: '10px 0',
      fontSize: '16px',
    },
    button: {
      backgroundColor: '#189788',
      border: 'none',
      padding: '12px 20px',
      color: 'white',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '18px',
      marginTop: '20px', // Add spacing between inputs and button
    },
  };

  return (
    <div style={styles.formContainer}>
      <div style={styles.heading}>Choose:</div>
      <label style={styles.label}>
        <input
          type="radio"
          value="get"
          checked={transactionType === 'get'}
          onChange={() => setTransactionType('get')}
          style={styles.input}
        />
        Get Transaction
      </label>
      <label style={styles.label}>
        <input
          type="radio"
          value="set"
          checked={transactionType === 'set'}
          onChange={() => setTransactionType('set')}
          style={styles.input}
        />
        Set Transaction
      </label>

      {transactionType === 'get' && (
        <div>
          Key:
          <input type="text" name="key" style={styles.input} />
        </div>
      )}
      {transactionType === 'set' && (
        <>
          <div>
            Key:
            <input type="text" name="key" style={styles.input} />
          </div>
          <div>
            Value:
            <input type="text" name="value" style={styles.input} />
          </div>
        </>
      )}
      <button type="submit" style={styles.button}>
        CONFIRM
      </button>
    </div>
  );
};

export default TransactionForm;