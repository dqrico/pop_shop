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
        <div style={{textAlign:"center"}}>
            <header>
                <h1>{course.course_name}</h1>
                {/* <Link to={"/home"}>HOME</Link> */}
            </header>

            <h2>Details:</h2>
            <p>{course.instructor}</p>
            <p>{course.course_level}</p>
            <p>{course.enroll_by}</p>
            <p>{course.starts_at}</p>
            <p>{course.enrolled_students}</p>

        </div>
    )
}

export default OneCourse;