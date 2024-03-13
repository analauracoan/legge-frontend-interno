import * as React from "react";

export const useApi = () => ({
    validateToken: async (token) => {

        const response = await fetch('http://192.168.0.131:50080/interno/autenticacao/token', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'LGG-Authentication-Key': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
                'LGG-Authentication-Version': '1.0.0',
                'Authorization': 'Bearer ' + token,
            },
        });
        return response.json();
    },
    signin: async (login, senha) => {

        const response = await fetch('http://192.168.0.131:50080/interno/autenticacao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'LGG-Authentication-Key': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
                'LGG-Authentication-Version': '1.0.0',
            },
            body: JSON.stringify({
                login: login,
                senha: senha
            }),
        })
        return response.json();
    },
    logout: async () => {
        return { status: true };
    },
    post: async (caminho, dados, token) => {

        const response = await fetch(`http://192.168.0.131:50080/${caminho}`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              'LGG-Authentication-Key': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
              'LGG-Authentication-Version': '1.0.0',
              'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(dados)
        });
        return response.json();
    },
    get: async (caminho, token) => {

        const response = await fetch(`http://192.168.0.131:50080/${caminho}`, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              'LGG-Authentication-Key': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
              'LGG-Authentication-Version': '1.0.0',
              'Authorization': 'Bearer ' + token,
            }
        });
        return response.json();
    },
    patch: async (caminho, dados, token) => {

        const response = await fetch(`http://192.168.0.131:50080/${caminho}`, {
            method: 'PATCH',
            headers: {
              'Content-type': 'application/json',
              'LGG-Authentication-Key': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
              'LGG-Authentication-Version': '1.0.0',
              'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(dados)
        });
        return response;
    },
    delete: async (caminho, token) => {
        const response = await fetch(`http://192.168.0.131:50080/${caminho}`, {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json',
              'LGG-Authentication-Key': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
              'LGG-Authentication-Version': '1.0.0',
              'Authorization': 'Bearer ' + token,
            },
        });
        return response;
    },
});