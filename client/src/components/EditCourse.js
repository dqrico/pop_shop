import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams} from 'react-router-dom';



const EditCourse = (props) => {

 // 1.FUNCTIONAL
    const navigate = useNavigate();
    const {id} = useParams();

    const [course_name, setCourse_name] = useState("");
    const [instructor,setInstructor] = useState("");
    const [course_level, setCourse_level] = useState("");
    const [enroll_by, setEnroll_by] = useState("");
    const [starts_at, setStarts_at] = useState("");
    const [enrolled_students, setEnrolled_students] = useState(0);
    const [is_webinar, setIs_webinar] = useState(false);

    const submitHandler = (e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8000/api/courses/${id}`,
        {
            course_name,
            instructor,
            course_level,
            enroll_by,
            starts_at,
            enrolled_students,
            is_webinar
        })
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            navigate("/home");
        })
        .catch((err)=>{console.log(err)})
    }

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/courses/${id}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setCourse_name(res.data.course_name);
                setInstructor(res.data.instructor);
                setCourse_level(res.data.course_level);
                setEnroll_by(res.data.enroll_by);
                setStarts_at(res.data.starts_at);
                setEnrolled_students(res.data.enrolled_students);
                setIs_webinar(res.data.is_webinar);
            })
            .catch((err)=>{console.log(err);})
    },[id])


 // 2.RETURN
    return(
        <div>
            <div className="top-row">
                <h1>Create A Course</h1>
                <Link to={"/home"}>Dashboard</Link>
            </div>

            <form onSubmit={submitHandler} className="create">

            <div>
                    <label>Course: </label>
                    <input value={course_name} onChange={(e)=>setCourse_name(e.target.value)} type="text" className="create"/>
                </div>

                <div>
                    <label>Instructor: </label>
                    <input value={instructor} onChange={(e)=>setInstructor(e.target.value)} type="text" className="create" />
                </div>

                <div>
                    <label>Course Level: </label>
                    <select value={course_level} onChange={(e)=>setCourse_level(e.target.value)} name="course_level" className="create">
                        <option defaultValue hidden>Select Course Level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>

                <div>
                    <label>Enroll By: </label>
                    <input value={enroll_by} onChange={(e)=>setEnroll_by(e.target.value)} type="date" className="create" />
                </div>

                <div>
                    <label>Start Date: </label>
                    <input value={starts_at} onChange={(e)=>setStarts_at(e.target.value)} type="date" className="create"/>
                </div>
                
                <div>
                    <label>Webinar? </label>
                    <input checked={is_webinar} onChange={(e)=>setIs_webinar(e.target.checked)} type="checkbox" className="create"/>
                </div>

                <div>
                    <label>Enrolled Students: </label>
                    <input value={enrolled_students} onChange={(e)=>setEnrolled_students(e.target.value)} type="number" className="create"/>
                </div>

                <button>UPDATE</button>

            </form>

        </div>
    )
}


export default EditCourse;