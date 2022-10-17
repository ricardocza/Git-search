let recentUsersSearched = []
let recentJson = null

function getLocalStorage() {
    let recentLocalStorage = localStorage.getItem("recents")
    if (!recentLocalStorage) {
        recentJson = JSON.stringify(recentUsersSearched)
        localStorage.setItem("recents", recentJson)
    } else {
        recentUsersSearched = JSON.parse(recentLocalStorage)
    }
    renderRecentUsers(recentUsersSearched)
}

const searchUserButton = document.querySelector('#button-search')
const input = document.querySelector('#git-user')

function checkInputValue() {   
    if(input.value.length > 0) searchUserButton.classList = ''
    else searchUserButton.classList = 'button-search-disabled'
}

input.addEventListener('keyup', (event) => {
    checkInputValue()
    const alert = document.querySelector('.alert')
    if(!alert.classList.contains('hide')) alert.classList.add('hide')
    if(event.key === 'Enter' && input.value.length > 0) searchUser()
})

searchUserButton.addEventListener('click', () => {
    if(input.value.length > 0) searchUser()
})

async function searchUser() {   
    const button = document.querySelector('#button-search')
    const img = document.createElement('img')
    img.src = '../../img/spinner.png'
    img.classList = 'spinner'
    button.innerHTML = ''
    button.append(img)


    recentJson = await getGitUser(input.value)
    if( recentJson) {
        localStorage.setItem('recents', recentJson)        
        renderRecentUsers(recentUsersSearched)
        window.location = './pages/profile/index.html'
    }
}

async function getGitUser(userName) {
    const baseUrl = 'https://api.github.com/users/'    
    try {
        const userDataPromisse = await fetch(`${baseUrl}${userName}`)
        if(!userDataPromisse.ok) {
            throw Error(userDataPromisse.statusText)  
        } 
        const dataJson =  await userDataPromisse.json()
        recentUsersSearched = recentUsersSearched.filter(user => user.id != dataJson.id)
        if(recentUsersSearched.length === 3) {
            recentUsersSearched.pop()
            recentUsersSearched.unshift(dataJson)            
        } else {
            recentUsersSearched.unshift(dataJson)            
        } 
        return JSON.stringify(recentUsersSearched)
        
    } catch {
        const button = document.querySelector('#button-search')        
        const alert = document.querySelector('.alert')
        alert.classList.remove('hide')
        button.innerHTML = 'Ver perfil do github'        
        return false       
    } 
}

getLocalStorage()
checkInputValue()