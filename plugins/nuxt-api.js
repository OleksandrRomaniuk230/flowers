import axios from 'axios';
import _ from 'lodash';
import apiAuth from '@/modules/api/auth';


function cleanRestApi(obj) {
    for (const propName in obj) {
        if (!obj.hasOwnProperty(propName)) continue;
    }
}
export default (ctx, inject) => {
    let client = axios.create({
        baseURL: process.env.NUXT_APP_API_URL || 'http://localhost:5000/api/v1/'
    })
    client.interceptors.request.use(async config => {
        if (config.method === 'put' || config.method === 'post') {
            cleanRestApi(config.data);
        }
        if (ctx.app.$cookies.get('token')) {

            config.headers.common['Authorization'] = `Bearer ${ctx.app.$cookies.get(
                "token"
            )}`;
        }

        return config;
    }, async error => {
        return Promise.reject(error);
    });

    client.interceptors.response.use(async response => {
        return response;
    }, async(error) => {

        let code = error.response && error.response.status ? error.response.status : 500;

        if (code === 422) {
            return Promise.reject({
                status: code,
                errors: error.response.data.errors
            });
        }
        if (code === 410) {
            return Promise.reject({
                status: 410,
                message: error.response.data.message
            });
        }
        if (code === 404) {
            ctx.error({ message: 'Страница не найдена!', statusCode: code })
            return Promise.reject({
                status: 404,
                message: error.response.data.message
            });
        }
        if (code === 403) {
            ctx.error({ message: 'Доступ запрещен!', statusCode: code })
            return Promise.reject({
                status: 403,
                message: error.response.data.message
            });
        }
        if (code === 401) {
            ctx.redirect({
                path: '/'
            })

            return Promise.reject({
                status: 401,
                message: error.response.data.message
            });
        }

        if (code === 400) {
            return Promise.reject({
                status: 400,
                message: error.response.data.message
            });
        }
    });


    const repositories = {
        auth: apiAuth(client),

    };
    inject('rest_api', repositories);
    ctx.app.$rest_api = repositories;
    return ctx;
}