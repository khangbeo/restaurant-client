import React, { useState } from 'react'
import ErrorAlert from '../layout/ErrorAlert'
import Reservations from '../reservations/Reservations'
import { listReservations } from '../utils/api'

export default function Search() {
    const [reservations, setReservations] = useState([])
    const [number, setNumber] = useState('')
    const [error, setError] = useState(null)
    const [found, setfound] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        const abortController = new AbortController()
        setfound(false)
        try {
            const response = await listReservations({ mobile_number: number }, abortController.signal)
            setReservations(response)
            setfound(true)
            setNumber('')
        } catch (error) {
            setError(error)
        }
        return () => abortController.abort()
    }

    function handleChange({ target }) {
        setNumber(target.value)
    }

    return (
        <div className="text-center h-screen">
            <ErrorAlert error={error} />
            <h2 className='font-bold text-teal-700 text-5xl mx-2 mt-3'>Search By Phone Number</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className='text-xl border-2 border-teal-500 rounded-3xl px-4 py-2 mx-3 my-4'
                    type="text"
                    name="mobile_number"
                    value={number}
                    onChange={handleChange}
                    placeholder="Enter a customer's phone number"
                    required
                />
                <button
                    className='focus:outline-none text-white bg-blue-500 hover:bg-teal-700 bg-teal-500 font-bold text-lg py-2 px-4 rounded-3xl'
                    type="submit"
                >
                    Find
                </button>
            </form>
            {reservations.length > 0 ? (
                <Reservations reservations={reservations} />
            ) : found && reservations.length === 0 ? (
                <p>No reservations found</p>
            ) : ('')}
        </div>
    )

}