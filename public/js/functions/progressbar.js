import Swal from "sweetalert2";

export const progressbar = () => {
    const tasks = document.querySelectorAll('li.task');
    if (tasks.length > 0) {
        //tasks completed
        const tasksCompleted = document.querySelectorAll('i.full');
        //tasks porcentage
        const porcentage = Math.round((tasksCompleted.length / tasks.length) * 100);
        //progressbar
        const progressbar = document.querySelector('#porcentage');
        progressbar.style.width = `${porcentage}%`;
        if (porcentage === 100) {
            Swal.fire({
                title: 'Congratulations!',
                text: 'You have completed all tasks',
                icon: 'success',
            });
        }

    }
}