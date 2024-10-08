import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { DATA_TABLE_NO_PRIMARY_EXISTS } from '../../../../../Constants';
import { VizDataHistoryContext } from '../../../../../Context/visualizer';
import { truncatedDummyData } from '../../Ancilliary/Data/data';
import { Tooltip } from '@mui/material';

const TABLE_HEADERS = [
  'Sr #',
  'Transaction',
  'Primary',
  'Faulty Replicas',
]

const CellValues = ({ value, loading, primaryDoesNotExist }) => {
  return (
    <td className={classNames("px-3 py-3 border-r-1p border-gray-700 dark:border-gray-50", { 'animate-pulse': loading }, { 'text-red-50': primaryDoesNotExist === DATA_TABLE_NO_PRIMARY_EXISTS })}>
      {loading ? (
        <div className='w-full h-3 px-3 bg-gray-200 dark:bg-gray-700 animate-pulse rounded' />
      ) : (
        <div className='text-12p'>
          {value}
        </div>
      )}
    </td>
  );
};

const TableValues = ({ srNo, transaction, loading }) => {

  const { transactionNumber } = transaction;

  const { changeCurrentTransaction, currentTransaction } = useContext(VizDataHistoryContext)

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    if(transactionNumber < 0) setOpen(false);
  };

  const handleOpen = () => {
    if(transactionNumber < 0) setOpen(true);
  };

  const changeTransaction = (value) => {
    changeCurrentTransaction(value)
  }

  return (
    <Tooltip 
      arrow
      placement="left"
      open={open} 
      onClose={handleClose} 
      onOpen={handleOpen} 
      title='SYNTHETIC DATA'
    >
      <tr
        className={classNames({
          'dark:bg-gray-700 bg-gray-400': transactionNumber == currentTransaction && !loading,
          'cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-400': !loading,
          'cursor-not-allowed': loading
        })}
        onClick={() => !loading && changeTransaction(transactionNumber ?? -1)}
      >
        <CellValues
          value={srNo}
          loading={loading}
          transaction={transaction}
          primaryDoesNotExist={transaction.primary}
        />
        {Object.keys(transaction).length > 0 &&
          Object.keys(transaction).map((value, idx) => {
            if (value !== 'replicaDetails') {
              return (
                <CellValues
                  value={transaction[value]}
                  loading={loading}
                  primaryDoesNotExist={transaction.primary}
                  key={idx}
                />
              );
            }
            return null;
          })
        }
      </tr>
    </Tooltip>
  );
}



const SmallTable = () => {
  const { loading, truncatedData } = useContext(VizDataHistoryContext)
  

  return (
    <table className="text-sm text-center rtl:text-right dark:text-gray-300 text-gray-700 h-full w-full">
        <thead className="text-xs uppercase dark:text-gray-300 text-gray-700 border-b-1p border-solid border-gray-700 dark:border-gray-50">
          <tr className='h-50p'>
          {TABLE_HEADERS.map((value, index) => {
            let isReplicaDetailCol = value === 'Replica Details';
            return (
              <th
                scope="col"
                className={classNames(
                  "px-1 py-2 border-r-1p border-gray-700 dark:border-gray-50 text-8p",
                  {
                    'w-[20%]': index === 0 || index === 3,
                    'w-[30%]': index === 1 || index === 2,
                    'border-r-0': isReplicaDetailCol,
                  }
                )}
                rowSpan={!isReplicaDetailCol && '2'}
                colSpan={isReplicaDetailCol && '4'}
                key={index}
              >
                {value}
              </th>
            );
          })}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <>
            {Object.keys(truncatedDummyData).length > 0 && Object.keys(truncatedDummyData).map((transactionKey, index) => {
              const transaction = truncatedDummyData[transactionKey];
              return (
                <TableValues
                  className='cursor-pointer'
                  key={transactionKey}
                  srNo={index + 1}
                  transaction={transaction}
                  loading={true}
                />
              );
            })}
            </>
          ) : (
            <>
                {Object.keys(truncatedData).length > 0 && Object.keys(truncatedData).map((transactionKey, index) => {
                  const transaction = truncatedData[transactionKey];
                  return (
                    <TableValues
                      className='cursor-pointer'
                      key={transactionKey}
                      srNo={index + 1}
                      transaction={transaction}
                      loading={loading}
                    />
                  );
                })}
            </>
          )}
        </tbody>
      </table>
  )
}

export default SmallTable