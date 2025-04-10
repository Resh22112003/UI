import './Form.css';
import React, { useState } from 'react';
import { submitAPI1, submitAPI2, submitAPI3 } from './api.jsx';
import { useNavigate } from 'react-router-dom';

function Form() {
  const navigate = useNavigate();

  const [neid, setNeid] = useState('');
  const [timeRange, setTimeRange] = useState('');

  const [fromDate, setFromDate] = useState('');
  const [fromHour, setFromHour] = useState('');
  const [fromMin, setFromMin] = useState('');
  const [fromSec, setFromSec] = useState('');

  const [toDate, setToDate] = useState('');
  const [toHour, setToHour] = useState('');
  const [toMin, setToMin] = useState('');
  const [toSec, setToSec] = useState('');

  const [portname , setportname] = useState('');
  const [monType, setMonType] = useState('');

  const [showTimestamp, setShowTimestamp] = useState(false);
  const [showportname, setShowportname] = useState(false);
  const [showMonType, setShowMonType] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let message;
      const fromTimestamp = `${fromDate}-${fromHour}-${fromMin}-${fromSec}`;
      const toTimestamp = `${toDate}-${toHour}-${toMin}-${toSec}`;

      if (!showTimestamp && !showportname && !showMonType) {
        message = await submitAPI1({ neid, timeRange });
      } else if (showTimestamp && showportname && !showMonType) {
        message = await submitAPI2({
          neid,
         // timeRange,
          fromTimestamp,
          toTimestamp,
          portname,
        });
      } else if (showTimestamp && showportname && showMonType) {
        message = await submitAPI3({
          neid,
        //  timeRange,
          fromTimestamp,
          toTimestamp,
          portname,
          monType,
        });
      } else {
        alert("Invalid form combination for submission.");
        return;
      }

      navigate('/table');
    } catch (error) {
      console.error(error);
      alert("Form submission failed.");
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="label-bold">Neid: </label>
        <input type="text" className="input-box" value={neid} required onChange={(e) => setNeid(e.target.value)} />
      </div>

      <div className="form-group">
        <label className="label-bold">Time: </label>
        <select className="input-box" value={timeRange} required onChange={(e) => setTimeRange(e.target.value)}>
          <option value="">Select</option>
          <option value="15min">15 min</option>
        </select>
      </div>

      <div className="form-section">
        <h3 className="section-title">Filter</h3>

        <div className="checkbox-group">
          <label>
            <input type="checkbox" onChange={() => setShowTimestamp(!showTimestamp)} /> Timestamp
          </label>
        </div>

        {showTimestamp && (
          <div className="sub-section">
            <div className="form-group">
              <label>From Timestamp:</label>
              <input type="date" className="input-box" required value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
              <div className="row-group">
                <select className="input-small" required value={fromHour} onChange={(e) => setFromHour(e.target.value)}>
                  <option value="">HH</option>
                  {[...Array(24).keys()].map(h => (
                    <option key={`fh-${h}`} value={String(h).padStart(2, '0')}>{String(h).padStart(2, '0')}</option>
                  ))}
                </select>
                <select className="input-small" required value={fromMin} onChange={(e) => setFromMin(e.target.value)}>
                  <option value="">MM</option>
                  {[...Array(60).keys()].map(m => (
                    <option key={`fm-${m}`} value={String(m).padStart(2, '0')}>{String(m).padStart(2, '0')}</option>
                  ))}
                </select>
                <select className="input-small" required value={fromSec} onChange={(e) => setFromSec(e.target.value)}>
                  <option value="">SS</option>
                  {[...Array(60).keys()].map(s => (
                    <option key={`fs-${s}`} value={String(s).padStart(2, '0')}>{String(s).padStart(2, '0')}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>To Timestamp:</label>
              <input type="date" className="input-box" required value={toDate} onChange={(e) => setToDate(e.target.value)} />
              <div className="row-group">
                <select className="input-small" required value={toHour} onChange={(e) => setToHour(e.target.value)}>
                  <option value="">HH</option>
                  {[...Array(24).keys()].map(h => (
                    <option key={`th-${h}`} value={String(h).padStart(2, '0')}>{String(h).padStart(2, '0')}</option>
                  ))}
                </select>
                <select className="input-small" required value={toMin} onChange={(e) => setToMin(e.target.value)}>
                  <option value="">MM</option>
                  {[...Array(60).keys()].map(m => (
                    <option key={`tm-${m}`} value={String(m).padStart(2, '0')}>{String(m).padStart(2, '0')}</option>
                  ))}
                </select>
                <select className="input-small" required value={toSec} onChange={(e) => setToSec(e.target.value)}>
                  <option value="">SS</option>
                  {[...Array(60).keys()].map(s => (
                    <option key={`ts-${s}`} value={String(s).padStart(2, '0')}>{String(s).padStart(2, '0')}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="checkbox-group">
          <label>
            <input type="checkbox" onChange={() => setShowportname(!showportname)} /> Port Number
          </label>
        </div>

        {showportname && (
          <div className="sub-section">
            <label>Enter the Port Number: </label>
            <input type="text" className="input-small" value={portname} onChange={(e) => setportname(e.target.value)} />
          </div>
        )}

        <div className="checkbox-group">
          <label>
            <input type="checkbox" onChange={() => setShowMonType(!showMonType)} /> Mon-Type
          </label>
        </div>

        {showMonType && (
          <div className="sub-section">
            <label>Enter the Mon-Type: </label>
            <input type="text" className="input-small" value={monType} onChange={(e) => setMonType(e.target.value)} />
          </div>
        )}
      </div>

      <div className="form-group" style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <button type="submit" className="submit-button">Submit</button>
      </div>
    </form>
  );
}

export default Form;
