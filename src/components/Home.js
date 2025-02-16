import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const [totalCourse, setTotalCourse] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalAmount, setAmount] = useState(0);
  const [students, setStudents] = useState([]);
  const [fees, setFees] = useState([]);

  useEffect(() => {
    getHomeDetails();
  }, []);

  const getHomeDetails = async () => {
    try {
      const res = await axios.get("http://localhost:4200/course/home/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
      setTotalCourse(res.data.totalCourse);
      setTotalStudents(res.data.totalStudent);
      setStudents(res.data.students);
      setFees(res.data.feeRecords || []);
      setAmount(res.data.totalAmount);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong...");
    }
  };

  return (
    <div className="home-wrapper">
      <div className="count-box-wrapper">
        <div className="box box1">
          <h2>00{totalCourse}</h2>
          <p>Courses</p>
        </div>
        <div className="box box2">
          <h2>00{totalStudents}</h2>
          <p>Students</p>
        </div>
        {/* <div className="box box3">
          <h2>Rs {totalAmount}</h2>
          <p>Total Amount</p>
        </div> */}
      </div>
      <div className="list-container">
        <div className="table-container">
          {students.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Student's Pic</th>
                  <th>Student Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id} className="student-row">
                    <td>
                      <img
                        className="student-profile-pic"
                        alt="student-pic"
                        src={student.imageUrl}
                      />
                    </td>
                    <td>
                      <p>{student.fullName}</p>
                    </td>
                    <td>
                      <p>{student.phone}</p>
                    </td>
                    <td>
                      <p>{student.email}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Student is here</p>
          )}
        </div>
        {/* <div className="table-container">
          {fees.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Student's Name</th>
                  <th>Date and Time</th>
                  <th>Amount</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((payment) => (
                  <tr key={payment._id}>
                    <td>{payment.fullName}</td>
                    <td>{payment.createdAt}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Payment History is here...</p>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Home;
