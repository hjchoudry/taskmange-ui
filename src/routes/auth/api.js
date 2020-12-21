import axios, { methods } from "../../config/axios";
import { baseUrl } from '../../config/apiBase';


export const signIn = async ({ username, password }) =>
	await axios()({
		url: `${baseUrl}/login`,
		data: {
			username,
			password
		},
		method: methods.POST,
		withCredentials: true,
	});

export const signOut = async () =>
	await axios()({
		url:`${baseUrl}/logout`,
		method: methods.POST,
	});

export const signUp = async ({
	name,
	username,
	password,
	confirmPassword
}) =>
	await axios()({
		url: `${baseUrl}/register`,
		data: {
			name,
			username,
			password,
			confirmPassword
		},
		method: methods.POST,
		withCredentials: true,
	});

export const editUser = async ({
	name,
	username,
}) =>
	await axios()({
		url: `${baseUrl}/edit-name`,
		data: {
			name,
		},
		method: methods.POST,
		withCredentials: true,
	});

export const changePassword = async ({
		oldPassword,
		password,
	}) =>
		await axios()({
			url: `${baseUrl}/change-password`,
			data: {
				oldPassword,
				password,
			},
			method: methods.POST,
			withCredentials: true,
		});

export const addTasks = async ({
		title,
		details,
		start_time,
		end_time,
	}) =>
		await axios()({
			url: `${baseUrl}/add-task`,
			data: {
				title,
				details,
				start_time,
		        end_time,
		        created: new Date()
			},
			method: methods.POST,
			withCredentials: true,
		});
		
	export const deleteAccount = async () =>
	await axios()({
		url:`${baseUrl}/delete-account`,
		method: methods.DELETE,
		withCredentials: true,
	});
