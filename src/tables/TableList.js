import React from 'react'
import Table from './Table'

export default function TableList({ tables }) {
    return (
        <>
            {tables && (
                <div className='container d-flex justify-content-center'>
                    {tables.map((table, index) => (
                        <Table table={table} key={index} />
                    ))}
                </div>
            )}
        </>
    )
}