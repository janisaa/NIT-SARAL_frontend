import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CourseDetail = () => {
  const params = useParams();
  const [course, setCourse] = useState(null);
  const [studentList, setStudentList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getCourseDetail();
  }, []);

  const getCourseDetail = () => {
    axios
      .get("http://localhost:4200/course/course-detail/" + params.id, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log(res.data.course);
        setCourse(res.data.course);
        setStudentList(res.data.studentList);
      })
      .catch((err) => {
        console.log(err);
        toast.error("something is wrong...");
      });
  };

  const deleteCourse = (courseId) => {
    if (window.confirm("are you sure you want to delete ?")) {
      axios
        .delete("http://localhost:4200/course/" + courseId, {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res.data);
          navigate("/dashboard/courses");
        })
        .catch((err) => {
          console.log(err);
          toast.error("something is wrong...");
        });
    }
  };
  return (
    <div className="course-detail-main-wrapper">
      {course && (
        <div>
          <div className="course-detail-wrapper">
            <img
              className="course-detail-thumbnail"
              alt="course thumbnail"
              src={course.imageUrl}
            />
            <div className="course-detail-text">
              <h1>{course.courseName}</h1>
              <p>Price :- {course.price}</p>
              <p>Starting Date :- {course.startingDate}</p>
              <p>End Date :- {course.endDate}</p>
            </div>
            <div className="course-description-box">
              <div className="btn-container">
                <button
                  className="primary-btn"
                  onClick={() => {
                    navigate("/dashboard/update-course/" + course._id, {
                      state: { course },
                    });
                  }}
                >
                  Edit
                </button>
                <button
                  className="secondary-btn"
                  onClick={() => {
                    deleteCourse(course._id);
                  }}
                >
                  Delete
                </button>
              </div>
              <h3>Course Description</h3>
              <div className="course-description-container">
                <p>{course.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {studentList && studentList.length > 0 && (
        <div className="student-list-container">
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
              {studentList.map((student) => (
                <tr
                  onClick={() => {
                    navigate("/dashboard/student-detail/" + student._id);
                  }}
                  key={student._id}
                  className="student-row"
                >
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
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
