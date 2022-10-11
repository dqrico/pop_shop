import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";



const AllCourses = (props) =>{

 // 1.FUNCTIONAL
    const [courseList, setCourseList] = useState([]); //deconstruct state array then initialize as empty array

    const deleteCourse = (idFromBelow) =>{
        axios.delete(`http://localhost:8000/api/courses/${idFromBelow}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setCourseList(courseList.filter(course => course._id !== idFromBelow))
            })
            .catch((err)=>{console.log(err)})
    }
    
    useEffect(()=>{
        axios.get("http://localhost:8000/api/courses") //axios request to get data from our api
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setCourseList(res.data);
            })
            .catch((err)=>{console.log(err)})

    }, [])


 // 2.RETURN
    return (
        <div>
            <div className="all-container">
            <header>
                <h1>Manage Courses</h1>
                <Link className="home" to={"/new"}>New Course</Link>
            </header>

            <table>
                <thead>
                    <tr>
                        <th>Course</th>
                        <th>Instructor</th>
                        <th>Start Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {courseList.map((course, index)=>{
                        return(
                            <tr key={course._id}>
                                <td>{course.course_name}</td>
                                <td>{course.instructor}</td>
                                <td>{course.starts_at}</td>
                                <td class="action">
                                    <Link to={`/course/${course._id}`}>View</Link>
                                    <Link onClick={()=>deleteCourse(course._id)}>Delete</Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </div>
        </div>
    )

}


export default AllCourses;