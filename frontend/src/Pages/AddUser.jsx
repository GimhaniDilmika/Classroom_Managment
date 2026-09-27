import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";


export default function AddUser(){

    const navigate = useNavigate();


    const [form,setForm] = useState({

        name:"",
        email:"",
        password:"",
        role:"student"

    });


    const [message,setMessage] = useState("");



    const handleChange = (e)=>{

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };



    const handleSubmit = async(e)=>{

        e.preventDefault();


        try{


            await API.post(
                "/auth/register",
                form
            );


            setMessage(
                "User created successfully"
            );


            setTimeout(()=>{

                navigate("/admin/users");

            },1000);



        }
        catch(error){


            setMessage(

                error.response?.data?.message ||
                "Failed to create user"

            );


        }


    };



    return (

        <div style={styles.page}>


            <div style={styles.card}>


                <h1 style={styles.title}>
                    Add New User
                </h1>


                <p style={styles.subtitle}>
                    Create a new admin, teacher, or student account
                </p>



                {
                    message &&

                    <div style={styles.message}>
                        {message}
                    </div>

                }



                <form onSubmit={handleSubmit}>


                    <label style={styles.label}>
                        Name
                    </label>


                    <input

                    style={styles.input}

                    name="name"

                    placeholder="Enter name"

                    value={form.name}

                    onChange={handleChange}

                    required

                    />





                    <label style={styles.label}>
                        Email
                    </label>


                    <input

                    style={styles.input}

                    name="email"

                    type="email"

                    placeholder="Enter email"

                    value={form.email}

                    onChange={handleChange}

                    required

                    />





                    <label style={styles.label}>
                        Password
                    </label>


                    <input

                    style={styles.input}

                    name="password"

                    type="password"

                    placeholder="Enter password"

                    value={form.password}

                    onChange={handleChange}

                    required

                    />





                    <label style={styles.label}>
                        Role
                    </label>


                    <select

                    style={styles.select}

                    name="role"

                    value={form.role}

                    onChange={handleChange}

                    >


                        <option value="student">
                            Student
                        </option>


                        <option value="teacher">
                            Teacher
                        </option>


                        <option value="admin">
                            Admin
                        </option>


                    </select>




                    <button

                    style={styles.button}

                    type="submit"

                    >

                        Create User

                    </button>



                    <button

                    style={styles.back}

                    type="button"

                    onClick={()=>navigate("/admin/users")}

                    >

                        Back

                    </button>



                </form>


            </div>


        </div>

    );


}





const styles = {


    page:{


        minHeight:"100vh",

        background:"#f4f7fb",

        display:"flex",

        justifyContent:"center",

        alignItems:"center"


    },



    card:{


        width:"450px",

        background:"#ffffff",

        padding:"40px",

        borderRadius:"20px",

        boxShadow:"0 10px 30px rgba(0,0,0,0.12)"


    },



    title:{


        fontSize:"32px",

        marginBottom:"8px",

        color:"#111827"


    },



    subtitle:{


        color:"#6b7280",

        marginBottom:"30px"


    },



    message:{


        background:"#dcfce7",

        color:"#166534",

        padding:"12px",

        borderRadius:"10px",

        marginBottom:"20px"


    },



    label:{


        display:"block",

        fontWeight:"600",

        marginBottom:"8px",

        marginTop:"18px"


    },



    input:{


        width:"100%",


        padding:"13px",


        border:"1px solid #d1d5db",


        borderRadius:"12px",


        fontSize:"15px",


        outline:"none",


        boxSizing:"border-box"


    },



    select:{


        width:"100%",


        padding:"13px",


        borderRadius:"12px",


        border:"1px solid #d1d5db",


        fontSize:"15px"


    },



    button:{


        width:"100%",


        marginTop:"25px",


        padding:"14px",


        border:"none",


        borderRadius:"12px",


        background:"linear-gradient(90deg,#ff9f00,#ff4b4b)",


        color:"white",


        fontSize:"16px",


        fontWeight:"600",


        cursor:"pointer"


    },



    back:{


        width:"100%",


        marginTop:"12px",


        padding:"13px",


        border:"none",


        borderRadius:"12px",


        background:"#e5e7eb",


        color:"#374151",


        fontSize:"15px",


        cursor:"pointer"


    }


};