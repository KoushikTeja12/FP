import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const SearchStudents = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [branch, setBranch] = useState('');
    const [rollNo, setRollNo] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/');
                setStudents(response.data.payload);
                setFilteredStudents(response.data.payload);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    const handleBranchChange = (e) => {
        const selectedBranch = e.target.value;
        setBranch(selectedBranch);
        filterStudents(selectedBranch, rollNo);
    };

    const handleRollNoChange = (e) => {
        const enteredRollNo = e.target.value;
        setRollNo(enteredRollNo);
        filterStudents(branch, enteredRollNo);
    };

    const filterStudents = (branch, rollNo) => {
        let filtered = students;

        if (branch) {
            filtered = filtered.filter((student) => student.Department === branch);
        }

        if (rollNo) {
            filtered = filtered.filter((student) =>
                student['ROLL NO'].toLowerCase().includes(rollNo.toLowerCase())
            );
        }

        setFilteredStudents(filtered);
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div
                className="container p-4 bg-white rounded shadow-lg w-100"
                style={{ maxWidth: '1000px' }}
            >
                <h1 className="text-center text-primary mb-4">Search Students</h1>

                <div className="row mb-4">
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Filter by Branch</label>
                        <select
                            className="form-select"
                            value={branch}
                            onChange={handleBranchChange}
                        >
                            <option value="">All</option>
                            <option value="CSE">CSE</option>
                            <option value="ECE">ECE</option>
                            <option value="MECH">MECH</option>
                            <option value="CIVIL">CIVIL</option>
                        </select>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Search by Roll No</label>
                        <input
                            type="text"
                            className="form-control"
                            value={rollNo}
                            onChange={handleRollNoChange}
                            placeholder="Enter Roll No"
                        />
                    </div>
                </div>

                <h4 className="text-secondary mb-3 text-center">Student List</h4>
                <div className="table-responsive">
                    <table className="table table-hover table-bordered text-center align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>ROLL NO</th>
                                <th>STUDENT NAME</th>
                                <th>MAIL ID</th>
                                <th>STUDENT PH NO</th>
                                <th>PARENT PH NO</th>
                                <th>Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                    <tr key={student._id}>
                                        <td>{student['ROLL NO']}</td>
                                        <td>{student['STUDENT NAME']}</td>
                                        <td>{student['MAIL ID']}</td>
                                        <td>{student['STUDENT PH NO']}</td>
                                        <td>{student['PARENT PH NO']}</td>
                                        <td>{student.Department}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-muted">
                                        No students found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SearchStudents;
