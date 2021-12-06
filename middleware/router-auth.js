export default function({
    store,
    redirect,
    route
}) {

    if (!store.$cookies.get('token') &&
        route.path !== '/' &&
        route.path !== '/login' &&
        route.path !== '/registration'
    ) {
        redirect({
            path: '/'
        })
    }


}