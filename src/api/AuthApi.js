const AUTH_API_HOST = 'http://localhost:8080/auth-server'

export const login = async (credentials) => {
    const response = await fetch(AUTH_API_HOST + '/v1/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    return response;
  }