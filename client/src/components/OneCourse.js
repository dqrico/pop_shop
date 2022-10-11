import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams} from 'react-router-dom';



const OneCourse = (props) => {

 // 1.FUNCTIONAL
    const [course, setCourse] = useState({});
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/courses/${id}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setCourse(res.data);
            })
            .catch((err)=>{console.log(err)})
    },[id])



 // 2.RETURN
    return(
        <div>
            <header>
                <h2>{course.course_name}</h2>
                <Link to={"/home"}>HOME</Link>
            </header>
            <div className="details">
                <h3>Details:</h3>
                <div className="details-2">
                    <p>Instructor:  {course.instructor}</p>
                    <p>Course Level: {course.course_level}</p>
                    <p>Enroll By: {course.enroll_by}</p>
                    <p>Starts Date: {course.starts_at}</p>
                    <p>Enrolled Students: {course.enrolled_students}</p>
                </div>
            </div>
        </div>
    )
}

export default OneCourse;