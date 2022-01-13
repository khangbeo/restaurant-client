import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router";
import { createTable } from "../utils/api";

export default function NewTable() {
    const initialFormState = {
        table_name: '',
        capacity: '',
    }
    const [formData, setFormData] = useState({ ...initialFormState })
    const [error, setError] = useState(null)
    const history = useHistory()

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        })
    }
    const handleNumber = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: Number(target.value)
        })
    }
    async function handleSubmit(event) {
        event.preventDefault()
        const abortController = new AbortController()
        try {
            await createTable(formData, abortController.signa)
            setFormData({ ...initialFormState })
            history.push('/dashboard')
        } catch (error) {
            setError(error)
        }
        return () => abortController.abort()
    }

    return (
        <div className="h-screen">
            <h2 className="font-bold text-teal-700 text-center text-5xl mx-2 mt-3">New Table</h2>
            <ErrorAlert error={error} />
            <div className="mx-auto sm:w-8/12 my-6 text-xl leading-10 bg-teal-500 text-white text-center border p-4 rounded-3xl">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="table_name">Table Name</label>
                        <input
                            type='text'
                            className='form-control'
                            id='table_name'
                            name='table_name'
                            placeholder='Table Name'
                            value={formData.table_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="capacity">Capacity</label>
                        <input
                            type='number'
                            className='form-control'
                            id='capacity'
                            name='capacity'
                            min={1}
                            placeholder="1"
                            value={formData.capacity}
                            onChange={handleNumber}
                            required
                        />
                    </div>
                    <button type='submit' className="focus:outline-none bg-gray-300 hover:bg-gray-400 hover:text-black text-gray-800 font-bold py-2 px-3">
                        Submit
                    </button>
                    <button onClick={history.goBack} className="focus:outline-none bg-gray-300 hover:bg-gray-400 hover:text-black text-gray-800 font-bold py-2 px-3">
                        Cancel
                    </button>
                </form>
            </div>

        </div>
    )
}
