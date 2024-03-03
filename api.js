// api.js

export const API_BASE_URL = 'http://localhost:8080/monster-quiz/';

const __fetchFunction = (url, method, data, token = false) => {
    method = method.toUpperCase();
    const headers = {
        'Content-Type': 'application/json'
    };

    if (token) {
        headers['Authorization'] = 'Bearer ' + token;
    }

    const requestOptions = {
        method,
        headers
    };

    if (method === 'GET') {
        // Construct the query string from the data object
        const queryString = Object.keys(data)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            .join('&');
        url += '?' + queryString;
    } else {
        requestOptions.body = JSON.stringify(data);
    }

    return new Promise((resolve, reject) => {
        fetch(API_BASE_URL + url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                reject(error);
            });
    });
};

export const getToken = async (user = false) => {
    return user.getIdToken()
        .then(token => {
            return token;
        });
}

export const getQuiz = async () => {
    return __fetchFunction('api/quiz', 'GET', {});
}

export const guess = async (guessData = false, user = false) => {
    const guessBody = {};
    switch (guessData) {
        case false: break;

        case 'size': guessBody.hintSize = true; break;

        case 'type': guessBody.hintType = true; break;

        case 'cr': guessBody.hintCR = true; break;

        case 'hp': guessBody.hintHP = true; break;

        case 'movement': guessBody.hintMovement = true; break;

        case 'alignment': guessBody.hintAlignment = true; break;

        case 'ac': guessBody.hintAC = true; break;

        default: guessBody.exactGuessUID = guessData; break;
    }

    return user.getIdToken()
        .then(token => {
            return __fetchFunction('api/guess', 'POST', guessBody, token);
        });
}
