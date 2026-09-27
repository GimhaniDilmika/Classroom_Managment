import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import API from "../api/api";


export default function AdminUsers(){

    const navigate = useNavigate();

    const [users,setUsers] = useState([]);
    const [search,setSearch] = useState("");



    const loadUsers = async()=>{

        try{

            const res = await API.get("/admin/users");

            setUsers(res.data);

        }
        catch(error){

            console.log(error);

        }

    };



    useEffect(()=>{

        loadUsers();

    },[]);




    const deleteUser = async(id)=>{


        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );


        if(!confirmDelete) return;


        try{

            await API.delete(
                `/admin/users/${id}`
            );


            loadUsers();


        }
        catch(error){

            console.log(error);

        }

    };



    const filteredUsers = users.filter(user=>

        user.name.toLowerCase()
        .includes(search.toLowerCase())

        ||

        user.email.toLowerCase()
        .includes(search.toLowerCase())

    );



    return(


        <div style={styles.page}>


            <div style={styles.header}>


                <div>

                    <h1>
                        User Management
                    </h1>

                    <p>
                        Manage system users and roles
                    </p>

                </div>



                <button

                style={styles.addButton}

                onClick={()=>navigate("/admin/users/add")}

                >

                    + Add User

                </button>


            </div>



            <input

            style={styles.search}

            placeholder="Search users..."

            value={search}

            onChange={(e)=>setSearch(e.target.value)}

            />



            <div style={styles.card}>


            <table style={styles.table}>


                <thead>

                    <tr>

                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>

                    </tr>

                </thead>



                <tbody>


                {

                filteredUsers.map(user=>(


                    <tr key={user._id}>


                        <td>
                            {user.name}
                        </td>


                        <td>
                            {user.email}
                        </td>


                        <td>


                            <span style={{

                                ...styles.role,

                                background:
                                user.role.toLowerCase()
                                ==="admin"
                                ?
                                "#ffe4e6"
                                :
                                user.role.toLowerCase()
                                ==="teacher"
                                ?
                                "#fff7ed"
                                :
                                "#dbeafe"


                            }}>


                            {user.role}


                            </span>


                        </td>



                        <td>


                            <button

                            style={styles.delete}

                            onClick={()=>
                                deleteUser(user._id)
                            }

                            >

                                Delete

                            </button>


                        </td>


                    </tr>


                ))

                }


                </tbody>



            </table>


            </div>


        </div>


    );

}





const styles={


page:{

padding:"35px",

background:"#f4f7fb",

minHeight:"100vh"

},


header:{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginBottom:"25px"

},


search:{

width:"350px",

padding:"12px",

borderRadius:"12px",

border:"1px solid #ddd",

marginBottom:"20px"

},


card:{

background:"white",

borderRadius:"20px",

padding:"20px",

boxShadow:"0 8px 25px rgba(0,0,0,0.08)"

},


table:{

width:"100%",

borderCollapse:"collapse"

},


role:{

padding:"6px 14px",

borderRadius:"20px",

fontWeight:"600"

},


addButton:{

background:"linear-gradient(90deg,#ff9f00,#ff4b4b)",

color:"white",

border:"none",

padding:"12px 25px",

borderRadius:"12px",

cursor:"pointer"

},


delete:{

background:"#ef4444",

color:"white",

border:"none",

padding:"8px 15px",

borderRadius:"8px",

cursor:"pointer"

}


};