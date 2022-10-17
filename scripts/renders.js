
function renderRecentUsers(arr) {
    document.querySelector('.recent-users').innerHTML = ''
    const recentUsers = document.querySelector('.recent-users')
    const recent = document.querySelector('.recent')
    if (recentUsersSearched.length == 0) {
        recent.classList = 'recent hide'
    } else {
        recent.classList= 'recent flex gap16 align-center'
        arr.forEach(user => {
            const li = document.createElement('li') 
            li.id = user.id
            const figure = document.createElement('figure')
            const img = document.createElement('img')
            const figCaption = document.createElement('figcaption')
            figCaption.innerText = 'Acessar este perfil'
            figCaption.classList = 'hide'
            img.src = user.avatar_url

            figure.append(img)
            li.append(figure, figCaption)
            recentUsers.append(li)
        });
    }
    recentListeners()
}

function recentListeners() {
    const ul = document.querySelector('.recent-users')
    li = [...ul.children]
    li.forEach(element => {
        element.addEventListener('click', (event) => {
            const targetId = event.target.closest('li').id
            const currentElementID = recentUsersSearched.findIndex(user => user.id == targetId)
            const currentElement = recentUsersSearched[currentElementID]
            recentUsersSearched = recentUsersSearched.filter(user => user.id !== currentElement.id)
            recentUsersSearched.unshift(currentElement)
            localStorage.setItem('recents', JSON.stringify(recentUsersSearched))
            window.location = './pages/profile/index.html'
        })
        element.addEventListener('mouseenter', (event) => {
            const figcaption = event.target.children[1]
            figcaption.classList = ''
        })
        element.addEventListener('mouseleave', (event) => {
            const figcaption = event.target.children[1]
            figcaption.classList = 'hide'
        })
    })
    
}

function renderCurrentUserHeader(userData) {
    let {html_url, avatar_url, email, bio, login, name} = userData    
    
    const avatarImg = document.querySelector('#avatar-img')
    avatarImg.closest('a').href = html_url
    avatarImg.closest('a').target = '_blank'
    
    if(!avatar_url) avatarImg.src = '../../octocat.png'
    else avatarImg.src = avatar_url

    const titleName = document.querySelector('#user-name')
    if(!name) titleName.innerText = login    
    else titleName.innerText = name
    
    const bioDescription = document.querySelector('#user-bio')
    if(!bio) bioDescription.innerText = '-'
    else bioDescription.innerText = bio

    const mailTo = document.querySelector('#user-email')
    if(!email) mailTo.href = 'mailto:'
    else mailTo.href = email    
}

function renderCurrentUserRepositories(repos) {
    if(repos.length > 0) {
        const emptyRepos = document.querySelector('.empty-repos')
        emptyRepos.classList = 'empty-repos hide'
    }    
    const ul = document.querySelector('.ul-desktop')
    repos.forEach(repositorie => {
        const li = document.createElement('li')
        const h2 = document.createElement('h2')
        const p = document.createElement('p')
        const div = document.createElement('div')
        const link = document.createElement('a')
        const buttonRepo = document.createElement('button')
        const buttonDemo = document.createElement('button')

        li.classList = 'card flex flex-column gap20'
        h2.innerText = repositorie.name
        h2.classList = 'title2'
        if(repositorie.description === null) p.innerText = 'Este repositório não possui uma descrição!'
        else p.innerText = repositorie.description
        div.classList = 'flex gap16'
        link.href = repositorie.html_url
        link.target = '_blank'
        buttonRepo.classList = 'button-card'
        buttonRepo.innerText = 'Repositório'
        buttonDemo.classList = 'button-card'
        buttonDemo.innerText = 'Demo'

        link.append(buttonRepo)
        div.append(link, buttonDemo)
        li.append(h2, p, div)
        ul.append(li)
        
    })
    const loading = document.querySelector('.loading-repos')
    setTimeout(() => {
        loading.classList.add('hide-octocat')        
    }, 1000);
    setTimeout(() => {
        loading.style.display = 'none'      
    }, 2000);
    const card = document.querySelector('.card-list')
    card.style.display = 'flex'
}


if(document.querySelector('.button-nav')) {
    recentUsersSearched = JSON.parse(localStorage.getItem('recents'))
    const currentUser = recentUsersSearched[0]
    renderCurrentUserHeader(currentUser)
    fetchRepositories(currentUser.login)
} 
