"use client";


import {useEffect} from "react";
import {useDispatch} from "react-redux";

import {
 setToken,
 setUser,
 setLoading
} from "../../store/slices/authSlice";


export default function AuthProvider({
children
}:{
children:React.ReactNode
}){


const dispatch=useDispatch();



useEffect(()=>{


const token =
localStorage.getItem("token");


const user =
localStorage.getItem("user");



if(token){

dispatch(setToken(token));


}


if(user){

dispatch(
setUser(JSON.parse(user))
);

}


dispatch(setLoading(false));


},[]);



return children;

}