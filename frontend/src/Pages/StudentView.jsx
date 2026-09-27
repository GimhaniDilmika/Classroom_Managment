import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../Components/Sidebar.jsx";
import API from "../api/api";
import "./StudentView.css";

import {
FaPhone,
FaSchool,
FaSearch,
FaEye,
FaEdit,
FaTrash,
FaPlus
} from "react-icons/fa";



const AVATAR_COLORS = [

"linear-gradient(135deg,#f59e0b,#ef4444)",
"linear-gradient(135deg,#3b82f6,#8b5cf6)",
"linear-gradient(135deg,#10b981,#06b6d4)",
"linear-gradient(135deg,#ec4899,#f43f5e)"

];



const GRADES = [

"All",
"Grade 9",
"Grade 10",
"Grade 11",
"Grade 12",
"Grade 13"

];



function initials(name){

return (

name || ""

)
.split(" ")
.filter(Boolean)
.slice(0,2)
.map(x=>x[0])
.join("")
.toUpperCase()

|| "?";

}




export default function StudentView(){


const navigate = useNavigate();



const [students,setStudents] = useState([]);

const [search,setSearch] = useState("");

const [grade,setGrade] = useState("All");

const [gender,setGender] = useState("All");

const [selected,setSelected] = useState(null);

const [loading,setLoading] = useState(true);






// ==========================
// LOAD STUDENTS FROM MONGODB
// ==========================

useEffect(()=>{


loadStudents();


},[]);





const loadStudents = async()=>{


try{


const res = await API.get(
"/admin/students"
);



setStudents(res.data);



}
catch(error){

console.log(error);

}

finally{

setLoading(false);

}


};







// ==========================
// DELETE STUDENT
// ==========================


async function handleDelete(id){


if(
!window.confirm(
"Delete this student?"
)

)

return;



try{


await API.delete(
`/admin/users/${id}`
);



setStudents(

students.filter(

s=>s._id !== id

)

);



setSelected(null);



}
catch(error){

console.log(error);

}


}







const filtered = students.filter(s=>{


const q = search.toLowerCase();



const matchSearch =


s.name?.toLowerCase()
.includes(q)



||

s.studentId?.toLowerCase()
.includes(q)



||

s.mobile?.includes(search);



const matchGrade =


grade==="All"

||

s.className===grade;



const matchGender =


gender==="All"

||

s.gender===gender;



return (

matchSearch

&&

matchGrade

&&

matchGender

);


});






return (

<>


<div className="sv-page">


<Sidebar />




<header className="sv-topbar">


<span className="sv-topbar-title">

Student View

</span>



<button

className="sv-add-btn"

onClick={()=>navigate("/students/add")}

>

<FaPlus/>

Add Student

</button>


</header>






<div className="sv-content">





<div className="sv-header-row">


<div>

<h1 className="sv-title">

Student Profiles

</h1>


<p className="sv-sub">

View and manage all student profiles

</p>


</div>


</div>








<div className="sv-filter-bar">



<div className="sv-search">


<FaSearch/>


<input

placeholder="Search name, ID or mobile"

value={search}

onChange={
e=>setSearch(e.target.value)
}

/>


</div>





<select

className="sv-filter"

value={grade}

onChange={
e=>setGrade(e.target.value)
}

>


{

GRADES.map(g=>(

<option key={g}>

{g}

</option>

))

}


</select>






<select

className="sv-filter"

value={gender}

onChange={
e=>setGender(e.target.value)
}

>


<option>
All
</option>


<option>
Male
</option>


<option>
Female
</option>


</select>



<span className="sv-count">

{filtered.length} students

</span>



</div>









{

loading ?

<h3>
Loading students...
</h3>



:

<div className="sv-grid">


{

filtered.map((s,index)=>(



<div

className="sv-card"

key={s._id}

>



<div className="sv-card-top">



<div

className="sv-avatar"

style={{

background:

AVATAR_COLORS[
index %
AVATAR_COLORS.length
]

}}

>


{initials(s.name)}


</div>





<div>


<p className="sv-name">

{s.name}

</p>


<p className="sv-admno">

{s.studentId || "No ID"}

</p>


</div>



</div>





<hr className="sv-divider"/>





<div className="sv-info">



<div className="sv-meta">


<span>

{s.gender || "N/A"}

</span>



<FaSchool/>


<span>

{s.className || "N/A"}

</span>



</div>





<div className="sv-meta">


<FaPhone/>


{s.mobile || "N/A"}


</div>



</div>








<div className="sv-card-actions">


<button

className="sv-icon-btn view"

onClick={()=>setSelected(s)}

>

<FaEye/>

View

</button>






<button

className="sv-icon-btn edit"

onClick={()=>navigate(

`/students/edit/${s._id}`

)}

>

<FaEdit/>

Edit

</button>






<button

className="sv-icon-btn del"

onClick={()=>handleDelete(s._id)}

>


<FaTrash/>


</button>



</div>





</div>



))


}



</div>



}





</div>




</div>









{
selected &&



<div className="sv-overlay">


<div className="sv-overlay-panel">



<div className="sv-detail-hero">


<div className="sv-detail-avatar">


{initials(selected.name)}


</div>



<div>


<h2 className="sv-detail-name">

{selected.name}

</h2>


<p className="sv-detail-admno">

{selected.studentId}

</p>


</div>



</div>





<div className="sv-detail-body">



<h4>
Academic Info
</h4>


<p>

Class:

{selected.className || "N/A"}

</p>


<p>

Gender:

{selected.gender || "N/A"}

</p>


<p>

Mobile:

{selected.mobile || "N/A"}

</p>





<h4>

Parent Info

</h4>


<p>

Father:

{selected.fatherName || "N/A"}

</p>



<p>

Father Mobile:

{selected.fatherMobile || "N/A"}

</p>



<p>

Mother:

{selected.motherName || "N/A"}

</p>



<p>

Mother Mobile:

{selected.motherMobile || "N/A"}

</p>



</div>






<div className="sv-detail-actions">


<button

className="sv-detail-edit"

onClick={()=>navigate(

`/students/edit/${selected._id}`

)}

>

Edit Student

</button>



<button

className="sv-detail-del"

onClick={()=>handleDelete(selected._id)}

>

Delete

</button>




<button

className="sv-detail-close"

onClick={()=>setSelected(null)}

>

Close

</button>



</div>






</div>



</div>



}



</>

);


}