import React, { useState } from "react"
import { useHistory } from "react-router"
import ErrorAlert from "../layout/ErrorAlert"
import { cancelReservation } from "../utils/api"

const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

export default function Reservations({ reservations }) {
    const [error, setError] = useState(null)
    const history = useHistory()

    async function handleCancel(reservationId) {
        if (window.confirm('Do you want to cancel this reservation? This cannot be undone.')) {
            try {
                await cancelReservation(reservationId)
                history.go()
            } catch (error) {
                setError(error)
            }
        }
    }
    return (
        <div className="flex flex-col sm:flex-row sm:justify-center flex-wrap">
            <ErrorAlert error={error} />
            {reservations.map(reservation => (
                <div key={reservation.reservation_id}>
                    {(reservation.status !== 'finished' && reservation.status !== 'cancelled') && (
                        <div className="mx-16 sm:w-8/12 my-6 text-xl leading-10 bg-teal-500 text-white text-center border p-4 rounded-3xl">
                            <p>First Name: {reservation.first_name}</p>
                            <p>Last Name: {reservation.last_name}</p>
                            <p>Mobile Number: {reservation.mobile_number}</p>
                            <p>Reservation Date: {dayjs(reservation.reservation_date).format('MM/DD/YYYY')}</p>
                            <p>Reservation Time: {dayjs(reservation.reservation_date).format('hh:mm A')}</p>
                            <p>People: {reservation.people}</p>
                            <p data-reservation-id-status={`${reservation.reservation_id}`}>Status: {reservation.status}</p>
                            <div className="flex justify-center">
                                <a
                                    className="focus:outline-none hover:no-underline bg-gray-300 hover:bg-gray-400 hover:text-black text-gray-800 font-bold py-2 px-3"
                                    href={`/reservations/${reservation.reservation_id}/edit`}>
                                    Edit
                                </a>
                                {reservation.status === 'booked' && (
                                    <a
                                        className="focus:outline-none hover:no-underline bg-gray-300 hover:bg-gray-400 hover:text-black text-gray-800 font-bold py-2 px-3"
                                        href={`/reservations/${reservation.reservation_id}/seat`}>
                                        Seat
                                    </a>
                                )}
                                <button
                                    className="focus:outline-none bg-gray-300 hover:bg-gray-400 hover:text-black text-gray-800 font-bold py-2 px-3"
                                    onClick={() => handleCancel(reservation.reservation_id)} data-reservation-id-cancel={reservation.reservation_id}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}