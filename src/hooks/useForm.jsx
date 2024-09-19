import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function useForm(initial={}) {
    const [values, setValues] = useState(initial)
   const navigate= useNavigate()

    const handleTarget = ({ target }) => {
        const { name, value } = target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };
    const resetValues=()=>{
        setValues(initial)
    }
  return {values,handleTarget,resetValues,navigate,setValues}
}
