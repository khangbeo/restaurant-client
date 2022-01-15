import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import { previous, next, today } from "../utils/date-time"
import { useHistory } from "react-router";
import Reservations from "../reservations/Reservations";
import TableList from "../tables/TableList";
import cooking from '../images/cooking-bg.jpg'
import '../layout/Layout'

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
      <div id="header" className="flex flex-col justify-center lg:flex-row items-center p-4 bg-teal-500 ">
        <label htmlFor="reservation_date">
          <h1 id="header-text" className="text-4xl sm:text-4xl m-1 font-bold text-white">Current Date:</h1>
        </label>
        <input
          className="text-2xl md:text-2xl font-bold text-teal-700 border-2 border-teal-500 rounded-3xl p-2 m-2 mx-4"
          type="date"
          pattern="\d{4}-\d{2}-\d{2}"
          name="reservation_date"
          onChange={handleDateChange}
          value={date}
        />
        <div id="buttonGroups" className="text-gray-100 text-xl sm:text-2xl ">
          <button
            type="button"
            className="focus:outline-none bg-orange-500 hover:bg-teal-700 bg-teal-500 font-bold py-2 px-3 rounded-3xl"
            onClick={() => handlePreviousDate(date)}
          >
            Previous
          </button>
          <button
            type="button"
            className="focus:outline-none bg-orange-500 hover:bg-teal-700 bg-teal-500 font-bold py-2 px-3 mx-3 my-2 sm:mx-2 rounded-3xl"
            onClick={() => setDate(today())}
          >
            Today
          </button>
          <button
            type="button"
            className="focus:outline-none bg-orange-500 hover:bg-teal-700 bg-teal-500 font-bold py-2 px-4 rounded-3xl"
            onClick={() => handleNextDate(date)}
          >
            Next
          </button>
        </div>
      </div>
      <div
        className="w-full h-full bg-no-repeat bg-cover bg-top"
        style={{ backgroundImage: `url(${cooking})` }}
      >
        <ErrorAlert error={error} />
        <Reservations reservations={reservations} />
        <h2 className="font-bold text-center text-teal-700 text-3xl md:text-5xl m-4">TABLES</h2>
        <TableList tables={tables} />
      </div>
    </main>
  );
}

export default Dashboard;
