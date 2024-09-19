import Swal from "sweetalert2"



export const alertMessage=(time,title,icon)=>{
    Swal.fire({
        timer: time,
        title: title,
        icon: icon
    })
}
