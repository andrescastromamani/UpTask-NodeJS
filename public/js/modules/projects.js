import Swal from "sweetalert2";
import axios from "axios";

const btnDelete = document.getElementById("delete-project");
if (btnDelete) {
    btnDelete.addEventListener("click", function (e) {
        const projectUrl = e.target.getAttribute("data-url");
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `${location.origin}/projects/${projectUrl}`;
                axios.delete(url, { params: { url } })
                    .then(function (response) {
                        console.log(response);
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        //redirect to home
                        setTimeout(function () {
                            window.location.href = "/";
                        }, 1000);
                    })
                    .catch(function (error) {
                        console.log(error);
                        Swal.fire(
                            {
                                icon: 'error',
                                type: 'error',
                                title: 'Oops...',
                                text: 'Something went wrong!',
                            }
                        )
                    });
            }
        })
    })
}

export default btnDelete;