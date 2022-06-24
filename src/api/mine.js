import  request from '../utils/request'
// import store from '../store'
export const userprofile=()=>{
    return  request ({
        url:'/v1_0/user/profile',
        // headers:{
        //     // Authorization:`Bearer ${store.state.token.token}`
        // }
    })
}