async function fetchRepositories(userName) {
    const baseURL = `https://api.github.com/users/${userName}/repos`
    const fetchData = await fetch(baseURL)
    const repositories = await fetchData.json()    
    renderCurrentUserRepositories(repositories)
}