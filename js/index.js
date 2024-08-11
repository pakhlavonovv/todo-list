let open_btn = document.getElementById("open-btn")
let user_modal = document.getElementById("user-modal")
let close = document.getElementById("close")
let save = document.getElementById("save")
let result = document.getElementById("result")
let forms = {}
let edit_user = -1;
let current_page = 1;
let items_per_page = 2;
const users = JSON.parse(localStorage.getItem("users")) || []
let search = ""
document.addEventListener("DOMContentLoaded", function () {
    save.addEventListener("click", addUser)
    displayUsers()
    saveStorage()
})

open_btn.addEventListener("click", function () {
    toggleModal("block")
})

close.addEventListener("click", function () {
    toggleModal("none")
})

function displayUsers() {
    result.innerHTML = ""
    let filtered_users = users.filter((item) => {
        if (item.first_name.includes(search)) {
            return item
        }       
    })
    let start_index = (current_page - 1) * items_per_page
    let end_index = start_index + items_per_page
    let displayUsers = filtered_users.slice(start_index, end_index)
    displayUsers.forEach((item, index) => {
        let tr = document.createElement("tr")
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.first_name}</td>
            <td>${item.last_name}</td>
            <td>${item.age}</td>
            <td>${item.mail}</td>
            <td>
                <button class="btn btn-info" onclick="editUser(${index})">edit</button>
                <button class="btn btn-danger" onclick="deleteTask()">delete</button>
            </td>
        `
        result.appendChild(tr)
    })
    paginationUsers(filtered_users.length)
}
function paginationUsers(total_users){
    let pagination_controls = document.getElementById("pagination-controls")
    let total_pages = Math.ceil(total_users / items_per_page)
    pagination_controls.innerHTML = ""
    for(let i = 0; i <= total_pages; i++){
        let page_btn = document.createElement("button")
        page_btn.innerText = i
        page_btn.className = i === current_page ? "btn btn-primary mx-1" : "btn btn-outline-primary mx-1"
        page_btn.addEventListener("click", function(){
            current_page = i
            displayUsers()
        })
        pagination_controls.appendChild(page_btn)
    }
}
window.addEventListener("click", function (event) {
    if (event.target === user_modal) {
        toggleModal("none")
    }
})
function handleChange(event) {
    const { name, value } = event.target
    forms = { ...forms, [name]: value }

}
function addUser() {
    users.push({ ...forms })
    displayUsers()
    toggleModal("none")
    saveStorage()
}
function toggleModal(status) {
    user_modal.style.display = status

}
function handleSearch(event) {
    search = event.target.value
    displayUsers()
}
function saveStorage() {
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("displayUsers", JSON.stringify(displayUsers))
}
function editUser(index) {
    edit_user = index
    forms = {...users[index]}
    document.querySelector("input[name='first_name']").value = forms.first_name
    document.querySelector("input[name='last_name']").value = forms.last_name
    document.querySelector("input[name='age']").value = forms.age
    document.querySelector("input[name='mail']").value = forms.mail
    toggleModal("block")
}
function deleteTask (index){
    users.splice(index, 1)
    saveStorage()
    displayUsers()
}