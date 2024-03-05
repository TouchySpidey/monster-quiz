// api.js

export const API_BASE_URL = 'https://api.questfinder.app/monster-quiz/';

export const __fetchFunction = (url, method, data) => {
    method = method.toUpperCase();
    const headers = {
        'Content-Type': 'application/json'
    };

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
