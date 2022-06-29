import axios from 'axios';

const userID = "6867e534-265f-485f-9f83-62cb4eced2cc";

const BASE_URL = 'https://api-3sxs63jhua-uc.a.run.app/v1/todo/';


export const axiosInstance = axios.create({
  baseURL : BASE_URL,
})
export const getTasks = () => {
  return axiosInstance.get(`:${userID}`);
}

export const postTask = (body) => {
  return axiosInstance.post(`:${userID}`, body);
}

export const resetTasks = () => {
  return axiosInstance.delete(`:${userID}/reset`)
}

export const removeTask = (body) => {
  return axiosInstance.delete(`:${userID}`,{data: body})
}

export const getCompletedTasks = () => {
  return axiosInstance.get(`:${userID}/:completed`)
}

export const setTaskCompleted = (body) => {
  return axiosInstance.put(`:${userID}`, body)
}
