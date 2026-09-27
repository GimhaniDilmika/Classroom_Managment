import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import API from "../api/api";
import "./AddStudent.css";


export default function AddStudent(){

const navigate = useNavigate();


const [form,setForm]=useState({

firstName:"",
lastName:"",
studentId:"",
gender:"",
email:"",
password:"",
className:"",
mobile:"",
fatherName:"",
fatherMobile:"",
motherName:"",
motherMobile:""

});



const handleChange=(e)=>{

setForm({

...form,
[e.target.name]:e.target.value

});

};




const handleSubmit=async(e)=>{

e.preventDefault();


try{


await API.post("/auth/register",{

name:
form.firstName+" "+form.lastName,

email:form.email,

password:form.password,

role:"student",

studentId:form.studentId,

gender:form.gender,

className:form.className,

mobile:form.mobile,

fatherName:form.fatherName,

fatherMobile:form.fatherMobile,

motherName:form.motherName,

motherMobile:form.motherMobile

});



alert("Student created successfully");

navigate("/students/list");


}
catch(error){

console.log(error);

alert(
error.response?.data?.message ||
"Failed"
);

}


};





return(

<div className="add-student-page">


<div className="page-header">

<div>

<h1>Add Student</h1>

<p>
Students / Add Student
</p>

</div>


</div>





<div className="student-card">


<h2>
Student Information
</h2>



<form onSubmit={handleSubmit}>


<div className="form-grid">



<div className="form-group">

<label>First Name</label>

<input
name="firstName"
placeholder="Enter first name"
onChange={handleChange}
/>

</div>




<div className="form-group">

<label>Last Name</label>

<input
name="lastName"
placeholder="Enter last name"
onChange={handleChange}
/>

</div>




<div className="form-group">

<label>Student ID</label>

<input
name="studentId"
placeholder="ST001"
onChange={handleChange}
/>

</div>




<div className="form-group">

<label>Gender</label>

<select
name="gender"
onChange={handleChange}
>

<option>
Select
</option>

<option>
Male
</option>

<option>
Female
</option>


</select>

</div>





<div className="form-group">

<label>Email</label>

<input
name="email"
type="email"
onChange={handleChange}
/>

</div>





<div className="form-group">

<label>Password</label>

<input
name="password"
type="password"
onChange={handleChange}
/>

</div>




<div className="form-group">

<label>Class</label>

<input
name="className"
placeholder="Grade 10A"
onChange={handleChange}
/>

</div>




<div className="form-group">

<label>Mobile</label>

<input
name="mobile"
onChange={handleChange}
/>

</div>


</div>






<h2 className="parent-title">
Parent Information
</h2>



<div className="form-grid">


<div className="form-group">

<label>
Father Name
</label>

<input
name="fatherName"
onChange={handleChange}
/>

</div>




<div className="form-group">

<label>
Father Mobile
</label>

<input
name="fatherMobile"
onChange={handleChange}
/>

</div>





<div className="form-group">

<label>
Mother Name
</label>

<input
name="motherName"
onChange={handleChange}
/>

</div>




<div className="form-group">

<label>
Mother Mobile
</label>

<input
name="motherMobile"
onChange={handleChange}
/>

</div>



</div>





<div className="button-area">


<button
type="submit"
className="create-btn"
>
Create Student
</button>



<button

type="button"

className="back-btn"

onClick={()=>navigate("/students/list")}

>
Back
</button>



</div>



</form>



</div>



</div>


);


}