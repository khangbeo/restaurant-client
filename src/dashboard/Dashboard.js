import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import { previous, next, today } from "../utils/date-time"
import { useHistory } from "react-router";
import Reservations from "../reservations/Reservations";
import TableList from "../tables/TableList";
const dayjs = require('dayjs')

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const query = useQuery()
  const history = useHistory()
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [tables, setTables] = useState([])
  const [date, setDate] = useState(query.get("date") || today())

  useEffect(loadDashboard, [date])
  useEffect(loadTables, [])

  function loadTables() {
    const abortController = new AbortController();
    setError(null);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setError);
    return () => abortController.abort();
  }

  function loadDashboard() {
    const abortController = new AbortController();
    setError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setError);
    return () => abortController.abort();
  }

  function handleDateChange({ target }) {
    setDate(target.value)
  }

  function handlePreviousDate() {
    setDate(previous(date))
    history.push(`dashboard?date=${previous(date)}`)
  }
  function handleNextDate() {
    setDate(next(date))
    history.push(`dashboard?date=${next(date)}`)
  }

  return (
    <main>
      <div className="dashboard-header text-center px-4 py-4">
        <h1 className="font-bold text-teal-700 text-6xl mx-2 pb-8">Dashboard</h1>
        <div>
          <label htmlFor="reservation_date" className="text-xl mx-2">
            Choose date:
          </label>
          <input
            className="text-xl border-2 border-teal-500 rounded-3xl px-2"
            type="date"
            pattern="\d{4}-\d{2}-\d{2}"
            name="reservation_date"
            onChange={handleDateChange}
            value={date}
          />
        </div>
        <div className="text-teal-700">
          <h4 className="text-xl py-2">Reservations for {dayjs(date).format('YYYY-MM-DD')}</h4>
        </div>
        <div className="container">
          <div className="text-white py-2">
            <button
              className="focus:outline-none bg-blue-500 hover:bg-teal-700 bg-teal-500 font-bold text-lg py-2 px-4 rounded-3xl"
              onClick={() => handlePreviousDate(date)}
            >
              Previous
            </button>
            <button
              className="focus:outline-none bg-blue-500 hover:bg-teal-700 bg-teal-500 font-bold text-lg py-2 px-4 mx-4 rounded-3xl"
              onClick={() => setDate(today())}
            >
              Today
            </button>
            <button
              className="focus:outline-none bg-blue-500 hover:bg-teal-700 bg-teal-500 font-bold text-lg py-2 px-4 rounded-3xl"
              onClick={() => handleNextDate(date)}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <ErrorAlert error={error} />
      <Reservations reservations={reservations} />
      <h2 className="font-bold text-center text-teal-700 text-5xl mx-2">Tables</h2>
      <TableList tables={tables} />

    </main>
  );
}

export default Dashboard;
