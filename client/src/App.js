import React, {useEffect} from "react";
import './App.css';
import AllCourses from  './components/AllCourses';
import NewCourse from './components/NewCourse';
import OneCourse from './components/OneCourse';
import EditCourse from './components/EditCourse';
import LogReg from './views/LogReg';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {

  return (
    <BrowserRouter>
    <div className="App">
        {/* ASSIGNS COMPONENT TO PATH */}
        <Routes>
          <Route element={<LogReg />} path="/" />
          <Route element={<AllCourses/>} path="/home" />
          <Route element={<NewCourse />} path="/new" />
          <Route element={<OneCourse />} path="/course/:id" />
          <Route element={<EditCourse />} path="/course/edit/:id" />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
