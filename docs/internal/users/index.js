import users from "./users"

export default {
    "/users/{:id}": {
        ...users,
    }
}