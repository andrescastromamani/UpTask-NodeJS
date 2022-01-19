const { default: axios } = require("axios");

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
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    });
}
exports.default = tasks;    