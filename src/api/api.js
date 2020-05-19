import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "c1758d8a-29be-475d-9212-7104301d41ae"
    }
});

export const usersApi = {
    getUsers (currentPage = 1, pageSize = 10)  {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    followUser (id) {
        return instance.post(`/follow/${id}`)
            .then(response => response.data)
    },

    unFollowUser (id) {
        return instance.delete(`/follow/${id}`)
            .then(response => response.data)
    }
};

export const authApi = {
    me () {
        return instance.get(`/auth/me`)
            .then(response => response.data)
    },
    login (email, password, rememberMe = false) {
        return instance.post(`/auth/login`, {email, password, rememberMe})
            .then(response => response.data)
    },
    logout () {
        return instance.delete(`/auth/login`)
            .then(response => response.data)
    }
};

export const profileApi = {
    setProfile (userId)   {
        return instance.get(`/profile/${userId}`)
            .then(response => response.data)
    },
    getStatus (userId)   {
        return instance.get(`/profile/status/${userId}`)
            .then(response => response.data)
    },
    updateStatus (status)   {
        return instance.put(`/profile/status`, {
            status: status
        })
            .then(response => response.data)
    },

};







