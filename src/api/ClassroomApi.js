import { ACCESS_DATA, ACCESS_TOKEN } from "../const/local-storage";

const ENTITY_API_HOST = 'http://localhost:8080/entity-service'

export const fetchAll = async (pageSize) => {
    const response = await fetch(ENTITY_API_HOST + '/v1/classrooms/all', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem(ACCESS_DATA))[ACCESS_TOKEN]
      },
      body: JSON.stringify(pageSize)
    });
    return response;
  }

  export const create = async (classroom) => {
    const response = await fetch(ENTITY_API_HOST + '/v1/classrooms', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem(ACCESS_DATA))[ACCESS_TOKEN]
      },
      body: JSON.stringify(classroom)
    });
    return response;
  }