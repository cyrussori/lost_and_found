export const API_BASE = 'http://localhost:5050/api'
// TODO, remove try catch => bubble to Signup.jsx/Login.jsx
export async function login({ email, password }) {
    try {
        // define response
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        // check if http error status code
        if (!response.ok) {
            throw new Error(`HTTP error; status: ${response.status}`);
        }
        // parse response body as json
        const loginData = await response.json();
        return loginData;
    } catch (error) {
        console.error('Error during fetch', error);
    }
}

export async function signup({ name, email, password }) {
    try {
        // define response
        const response = await fetch(`${API_BASE}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        // check if http error status code 
        if (!response.ok) {
            throw new Error(`HTTP error; status: ${response.status}`);
        }
        // parse response body as json
        const signupData = await response.json();
        return signupData;
    } catch(error) {
        console.error('Error during fetch', error);
    }
}