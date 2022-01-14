import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import ErrorAlert from '../layout/ErrorAlert'
import { listReservations } from '../utils/api'
import { deleteTable } from '../utils/api'

export default function Table({ table, index }) {
    const [reservations, setReservations] = useState([])
    const [error, setError] = useState(null)
    const history = useHistory()

    useEffect(() => {
        listReservations().then(setReservations)
    }, [])
    function handleFinish(tableId) {
        if (window.confirm('Is this table ready to seat new guests?')) {
            deleteTable(tableId)
                .then(history.go())
                .catch(setError)
        }
    }

    const foundRes = reservations.find(res => Number(table.reservation_id) === Number(res.reservation_id))
    return (
        <div className='flex flex-row justify-center items-center drop-shadow-3xl mx-auto text-center w-8/12 sm:w-4/12 text-xl font-bold leading-10 bg-teal-500 text-gray-100 p-4 rounded-3xl'>
            <div key={index}>
                <ErrorAlert error={error} />
                <h2>Table Name: {table.table_name}</h2>
                <p>Capacity: {table.capacity}</p>
                <p data-table-id-status={`${table.table_id}`}>Status: {table.reservation_id ? 'Occupied by ' : 'Free'}</p>
                {foundRes && (
                    <p>{foundRes.first_name} {foundRes.last_name}</p>
                )}
                {table.reservation_id && (
                    <button
                        className='focus:outline-none bg-gray-100 hover:bg-teal-600 hover:text-black text-teal-700 font-bold py-1 px-3 my-2 rounded-full'
                        type='submit' data-table-id-finish={`${table.table_id}`} onClick={() => handleFinish(table.table_id)}
                    >
                        Finish
                    </button>
                )
                }
            </div>
        </div>
    )
}