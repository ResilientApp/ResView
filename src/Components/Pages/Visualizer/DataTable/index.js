import React, { Fragment, useEffect, useState } from 'react';
import { computeTableData, computeTransInfo } from '../Computation/TransInfo';
import { dummyData, tableDataDummy } from '../Graphs/data';
import classNames from 'classnames';
import { DATA_TABLE_NO_PRIMARY_EXISTS } from '../../../../Constants';

const CellValues = ({ value, loading, replicaDetailsKeys, replicaDetailsBool, primaryDoesNotExist }) => {
    return (
        <td rowSpan={!replicaDetailsBool ? replicaDetailsKeys.length + 1 : ''} className={classNames("px-6 py-3 border-r-1p border-gray-700 dark:border-gray-50", { 'animate-pulse': loading }, { 'text-red-50': primaryDoesNotExist === DATA_TABLE_NO_PRIMARY_EXISTS })}>
            {loading ? (
                <div className='w-full h-3 px-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded' />
            ) : (
                <>
                    {value}
                </>
            )}
        </td>
    );
};

const TableValues = ({ srNo, transaction, replicaDetailsKeys, loading }) => {
    return (
        <Fragment>
            <tr className='border-b-1p'>
                <CellValues 
                    value={srNo} 
                    loading={loading} 
                    replicaDetailsKeys={replicaDetailsKeys} transaction={transaction} 
                    primaryDoesNotExist={transaction.primary}
                />
                {Object.keys(transaction).length > 0 && (
                    Object.keys(transaction).map((value, idx) => {
                        if(value !== 'replicaDetails') return (
                            <CellValues
                                value={transaction[value]} 
                                loading={loading} 
                                replicaDetailsKeys={replicaDetailsKeys} 
                                primaryDoesNotExist={transaction.primary}
                                key={idx}
                            />
                        )
                })
                )}
            </tr>   
            {replicaDetailsKeys.map((replicaKey, index) => {
                const replica = transaction.replicaDetails[replicaKey];
                return (
                    <tr key={replicaKey} className='border-b-1p'>
                        <CellValues
                            value={replicaKey} 
                            loading={loading} 
                            replicaDetailsKeys={replicaDetailsKeys} 
                            primaryDoesNotExist={transaction.primary}                            key={index}
                            replicaDetailsBool
                        />
                        {Object.keys(replica).length > 0 && (
                            Object.keys(replica).map((value, idx) => (
                                <CellValues
                                    value={replica[value]} 
                                    loading={loading} 
                                    replicaDetailsKeys={replicaDetailsKeys} 
                                    primaryDoesNotExist={transaction.primary}
                                    key={idx}
                                    replicaDetailsBool
                                />
                            )) 
                        )}
                    </tr>
                );
            })}         
        </Fragment>
    );
}

const DataTable = ({ messageHistory, transactionNumber, status, delay=3000 }) => {

    let defaultData = Object.keys(messageHistory).length > 0 ? messageHistory : dummyData;

    const [currentHistory, setCurrentHistory] = useState(defaultData);
    const [tableLoading, setTableLoading] = useState(false);
    
    const [tableData, setTableData] = useState();

    useEffect(() => {
        setTableLoading(true)
        const timeoutId = setTimeout(() => {
            if (Object.keys(messageHistory).length > 0) {
                setCurrentHistory(messageHistory);
                const { data } = computeTableData(messageHistory);
                setTableData(data)
            } else {
                setCurrentHistory(dummyData);
                setTableData(tableDataDummy)
            }
            setTableLoading(false)
        }, delay);

        return () => clearTimeout(timeoutId);
    }, [messageHistory, delay]);

    const { primaryIndex, transactions, currentStatus, faultReplicas } = computeTransInfo(currentHistory, transactionNumber, status)


  return (
      <div className="relative overflow-x-auto rounded-md border-3p bg-blue-10 dark:border-solid border-gray-700 dark:border-gray-50 h-550p">
          <table className="w-full text-sm text-center rtl:text-right dark:text-gray-300 text-gray-700">
              <thead className="text-xs uppercase dark:text-gray-300 text-gray-700 w-full border-b-1p border-gray-700 dark:border-gray-50">
                  <tr>
                      <th scope="col" className="px-6 py-3 border-r-1p border-gray-700 dark:border-gray-50" rowSpan="2">
                          Sr #
                      </th>
                      <th scope="col" className="px-6 py-3 border-r-1p border-gray-700 dark:border-gray-50" rowSpan="2">
                          Transaction #
                      </th>
                      <th scope="col" className="px-6 py-3 border-r-1p border-gray-700 dark:border-gray-50" rowSpan="2">
                          Primary
                      </th>
                      <th scope="col" className="px-6 py-3 border-r-1p border-gray-700 dark:border-gray-50" rowSpan="2">
                          Faulty Replicas
                      </th>
                      <th scope="col" className="px-6 py-3 border-b-1p border-gray-700 dark:border-gray-50" colSpan="4">
                          Replica Details
                      </th>
                  </tr>
                  <tr>
                      <th scope="col" className="px-6 py-3 border-r-1p border-gray-700 dark:border-gray-50">
                          Replica Number
                      </th>
                      <th scope="col" className="px-6 py-3 border-r-1p border-gray-700 dark:border-gray-50">
                          Commit Time
                      </th>
                      <th scope="col" className="px-6 py-3 border-r-1p border-gray-700 dark:border-gray-50">
                          Execution Time
                      </th>
                      <th scope="col" className="px-6 py-3 border-gray-700 dark:border-gray-50">
                          Prepare Time
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {tableLoading ? (
                    <>
                        {Object.keys(tableDataDummy).map((transactionKey, index) => {
                        const transaction = tableDataDummy[transactionKey];
                        const replicaDetailsKeys = Object.keys(transaction.replicaDetails);
                        return (
                            <TableValues
                                className='cursor-pointer'
                                key={transactionKey}
                                srNo={index + 1}
                                transaction={transaction} replicaDetailsKeys={replicaDetailsKeys}
                                loading={tableLoading}
                            />
                        );
                    })}
                    </>
                  ) : (
                    <>
                    {typeof tableData !== 'undefined' && Object.keys(tableData).map((transactionKey, index) => {
                      const transaction = tableData[transactionKey];
                      const replicaDetailsKeys = Object.keys(transaction.replicaDetails);
                      return (
                          <TableValues
                              className='cursor-pointer'
                              key={transactionKey}
                              srNo={index + 1}
                              transaction={transaction} replicaDetailsKeys={replicaDetailsKeys}
                          />     
                      );
                  })}
                    </>
                  )}
              </tbody>
              
          </table>
          <div className="flex items-center justify-between px-8" aria-label="Table navigation">
              <div>
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">20</span></span>
              </div>
              <div className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                  <div className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</div>
                  <div className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</div>
              </div>
          </div>
      </div>

  )
}

export default DataTable