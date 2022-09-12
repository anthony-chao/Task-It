import * as UserAPI from "../util/userUtil"

export const RECEIVE_USERS = "RECEIVE_USERS";

const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users : users.data
})

export const fetchUsers = () => dispatch => {
    return UserAPI.fetchUsers()
        .then( users => dispatch(receiveUsers(users)))
        .catch( err => console.log(err))
}