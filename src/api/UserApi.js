const USER_API_HOST = 'http://localhost:8080/user-service'

export const register = async (user) => {
    const response = await fetch(USER_API_HOST + '/v1/users/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      return response;
}