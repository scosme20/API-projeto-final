import users from "./users"
import companies from "./companies"
import products from "./products"
import reviews from "./reviews"

export default {
    ...users,
    ...companies,
    ...products,
    ...reviews
}