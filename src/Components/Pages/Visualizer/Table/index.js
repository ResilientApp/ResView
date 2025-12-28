import classNames from 'classnames';
import React, { Fragment, useContext, useState } from 'react';
import { DATA_TABLE_NO_PRIMARY_EXISTS } from '../../../../Constants';
import { VizDataHistoryContext } from '../../../../Context/visualizer';
import { FontVarTitle } from '../../../Shared/Title';
import { tableDataDummy } from '../Ancilliary/Data/data';
import Carousel from './Components/Carousel';
import { Tooltip } from '@mui/material';

const TABLE_HEADERS = {
    1: [
        'Sr #',
        'Transaction #',
        'Primary',
        'Faulty Replicas',
        'Replica Details'
    ],
    2: [
        'Replica Number',
        'Commit Time',
        'Execution Time',
        'Prepare Time'
    ]
}

export const CellValues = ({ value, loading, replicaDetailsKeys, replicaDetailsBool, primaryDoesNotExist }) => {
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

const TableValues = ({ srNo, transaction, replicaDetailsKeys, loading, goToPbftGraph }) => {

    const { changeCurrentTransaction } = useContext(VizDataHistoryContext)

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        if (transaction.transactionNumber < 0) setOpen(false);
    };

    const handleOpen = () => {
        if (transaction.transactionNumber < 0) setOpen(true);
    };

    const changeTransaction = (value) => {
        changeCurrentTransaction(value)
        goToPbftGraph();
    }

    return (
        <>
            <Tooltip
                arrow
                placement="top-start"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                title='SYNTHETIC DATA'
            >
                <tr className={classNames({ 'cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-400': !loading })} onClick={() => !loading && changeTransaction(transaction.transactionNumber)}>
                    <CellValues
                        value={srNo}
                        loading={loading}
                        replicaDetailsKeys={replicaDetailsKeys} transaction={transaction}
                        primaryDoesNotExist={transaction.primary}
                    />
                    {Object.keys(transaction).length > 0 && (
                        Object.keys(transaction).map((value, idx) => {
                            if (value !== 'replicaDetails') return (
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
            </Tooltip>
            {replicaDetailsKeys.map((replicaKey, index) => {
                const replica = transaction.replicaDetails[replicaKey];
                return (
                    <tr key={replicaKey} className='border-b-2p'>
                        <CellValues
                            value={replicaKey}
                            loading={loading}
                            replicaDetailsKeys={replicaDetailsKeys}
                            primaryDoesNotExist={transaction.primary}
                            key={index}
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
        </>
    );
}

const DataTable = ({ goToPbftGraph }) => {

    const { data, loading } = useContext(VizDataHistoryContext)

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = data ? Math.ceil(Object.keys(data).length / itemsPerPage) : 1;

    const startRecord = (currentPage - 1) * itemsPerPage + 1;
    const endRecord = Math.min(currentPage * itemsPerPage, data ? Object.keys(data).length : 0);

    const handleChangePage = (direction) => {
        setCurrentPage((prevPage) => {
            if (direction === 'next' && prevPage < totalPages) {
                return prevPage + 1;
            } else if (direction === 'prev' && prevPage > 1) {
                return prevPage - 1;
            }
            return prevPage;
        });
    };

    const currentTableData = data ? Object.keys(data).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

    return (
        <>
            <div className='mt-10 mb-10'>
                <FontVarTitle title={'Current Transactions'} />
            </div>
            <div className="relative overflow-x-auto rounded-md border-3p bg-blue-10 dark:border-solid border-gray-700 dark:border-gray-50 h-600p">
                <div className="overflow-y-auto h-550p scrollbar">
                    <table className="w-full text-sm text-center rtl:text-right dark:text-gray-300 text-gray-700">
                        <thead className="text-xs uppercase dark:text-gray-300 text-gray-700 w-full border-gray-700 dark:border-gray-50 bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                            <tr>
                                {TABLE_HEADERS[1].map((value, index) => {
                                    let isReplicaDetailCol = value === 'Replica Details';
                                    return (
                                        <th scope="col" className={classNames("px-6 py-3 border-r-1p border-gray-700 dark:border-gray-50", { 'border-r-0': isReplicaDetailCol })} rowSpan={!isReplicaDetailCol && '2'} colSpan={isReplicaDetailCol && '4'} key={index}>
                                            {value}
                                        </th>
                                    )
                                })}
                            </tr>
                            <tr>
                                {TABLE_HEADERS[2].map((value, index) => {
                                    return (
                                        <th scope="col" className={classNames("px-6 py-3 border-gray-700 dark:border-gray-50 border-t-1p border-r-1p")} key={index}>
                                            {value}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
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
                                                loading={loading}
                                                goToPbftGraph={goToPbftGraph}
                                            />
                                        );
                                    })}
                                </>
                            ) : (
                                <>
                                    {currentTableData.map((transactionKey, index) => {
                                        const transaction = data[transactionKey];
                                        const replicaDetailsKeys = Object.keys(transaction.replicaDetails);
                                        return (
                                            <TableValues
                                                className='cursor-pointer'
                                                key={transactionKey}
                                                srNo={index + 1 + (currentPage - 1) * itemsPerPage}
                                                transaction={transaction} replicaDetailsKeys={replicaDetailsKeys}
                                                goToPbftGraph={goToPbftGraph}
                                            />
                                        );
                                    })}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
                <Carousel
                    onPrev={() => handleChangePage('prev')} onNext={() => handleChangePage('next')} nextDisabled={currentPage === totalPages} prevDisabled={currentPage === 1}
                    startRecord={startRecord}
                    endRecord={endRecord}
                    currentData={currentTableData}
                />
            </div>
        </>
    )
}

export default DataTable;
