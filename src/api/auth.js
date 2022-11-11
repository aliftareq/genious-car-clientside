export const setAuthToken = (user) => {
    // get JWT token
    fetch('https://genious-car-server-with-jwt.vercel.app/jwt', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            //setting the token into local storage (not the best practice)
            localStorage.setItem('genius-Token', data.token)
        })
}