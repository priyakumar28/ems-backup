import React from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';


const Statistics = () => {
    return (
        <div className="card p-3 statistics">
            <label className="f-15 mb-4">Statistics</label>
            <div className="mb-4">
                <div className="d-flex justify-content-between">
                    <span>Today</span>
                    <span>3.45/8hrs</span>
                </div>
                <span><ProgressBar now={25} variant="today" /></span>
            </div>
            <div className="mb-4">
                <div className="d-flex justify-content-between">
                    <span>This Week</span>
                    <span>28/40hrs</span>
                </div>
                <span><ProgressBar now={60} variant="week" /></span>
            </div>
            <div className="mb-4">
                <div className="d-flex justify-content-between">
                    <span>This Month</span>
                    <span>90/100hrs</span>
                </div>
                <span><ProgressBar now={90} variant="month" /></span>
            </div>
            <div className="mb-4">
                <div className="d-flex justify-content-between">
                    <span>Remaining</span>
                    <span>90/100hrs</span>
                </div>
                <span><ProgressBar now={90} variant="remaining" /></span>
            </div>
            <div className="mb-4">
                <div className="d-flex justify-content-between">
                    <span>Overtime</span>
                    <span>5hrs</span>
                </div>
                <span><ProgressBar now={25} /></span>
            </div>

        </div>
    );
}

export default Statistics;