const hideUserPassword = ({ id, name, email, createdAt, updatedAt }) => ({ id, name, email, createdAt, updatedAt });

const hideCompanyPassword = ({ id, name, email, category, rating, createdAt, updatedAt }) => ({ id, name, email, category, rating, createdAt, updatedAt });

export { hideUserPassword, hideCompanyPassword }
