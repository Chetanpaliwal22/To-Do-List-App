import tododatas from './tododatas'

function addTask() {
    tododatas.push({
        id: 3,
        text: "new task push the code to git and update readme",
        completed: false
    });
}

export default addTask