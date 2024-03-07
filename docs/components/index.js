import users from "./users.js"
import companies from "./companies.js"
import products from "./products.js"
import reviews from "./reviews.js"

export default {
    components: {
        scheme: {
            ...users,
            ...companies,
            ...products,
            ...reviews,
            Error: {
                type: "object",
                properties: {
                    title: {
                        type: "string"
                    },
                    error: {
                        type: "string"
                    },
                    message: {
                        type: "string"
                    }

                }
            }
        }
    }
}
