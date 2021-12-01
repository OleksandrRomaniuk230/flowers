// export default function({ store, redirect, route }) {
//     let isMaintenance = process.env.MAINTENANCE_MODE === 'true' ? true : false;

//     if (isMaintenance && route.path !== '/maintenance') {
//         redirect({ path: 'maintenance' })
//     }
//     if (!isMaintenance && route.path === '/maintenance') {
//         redirect({
//             path: '/'
//         })
//     }

//     if (!isMaintenance &&
//         !store.$cookies.get('token') &&
//         route.path !== '/' &&

//         route.name.indexOf('login') === -1 &&

//         route.name.indexOf('register') === -1

//     ) {
//         redirect({
//             path: '/'
//         })
//     }


// }