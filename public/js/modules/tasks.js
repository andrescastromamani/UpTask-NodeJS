const { default: axios } = require("axios");
const Swal = require("sweetalert2");

const { progressbar } = require("../functions/progressbar");

const tasks = document.querySelector('.slope-list');
if (tasks) {
    tasks.addEventListener('click', function (e) {
        if (e.target.classList.contains('fa-check-circle')) {
            const icon = e.target;
            const idTask = icon.parentElement.parentElement.dataset.id;
            const url = `${location.origin}/tasks/${idTask}`;
            console.log(url);
            axios.patch(url, {
                idTask,
            }).then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    icon.classList.toggle('full');
                    progressbar();
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
        if (e.target.classList.contains('fa-trash')) {
            const icon = e.target;
            const idTask = icon.parentElement.parentElement.dataset.id;
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
                    const url = `${location.origin}/tasks/${idTask}`;
                    console.log(url);
                    axios.delete(url, { params: { idTask } })
                        .then(function (response) {
                            console.log(response);
                            if (response.status === 200) {
                                icon.parentElement.parentElement.remove();
                                progressbar();
                            }
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
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
        }
    });
}
exports.default = tasks;    