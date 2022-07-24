import { ACCESS_DATA, ACCESS_TOKEN } from "../const/local-storage";

const ENTITY_API_HOST = 'http://localhost:8080/entity-service'

  export const fetchAllList = async () => {
    const response = await fetch(ENTITY_API_HOST + '/v1/subjects', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem(ACCESS_DATA))[ACCESS_TOKEN]
      },
    });
    return response;
  }