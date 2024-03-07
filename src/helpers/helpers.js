const hideUserPassword = ({ id, name, email, createdAt, updatedAt }) => ({ id, name, email, createdAt, updatedAt });

const hideCompanyPassword = ({ id, name, email, category, rating, createdAt, updatedAt }) => ({ id, name, email, category, rating, createdAt, updatedAt });

const calculateRating = (allRatings) => allRatings.reduce( (acc, review) => acc + review.rating, 0 ) / allRatings.length;

export { hideUserPassword, hideCompanyPassword, calculateRating }
