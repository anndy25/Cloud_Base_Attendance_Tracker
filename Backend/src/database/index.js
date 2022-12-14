// database related modules
module.exports = {
    databaseConnection: require('./connection'),

    AdminUserRepository: require('./repository/admin-repository/AdminUserRepository'),
    UserRepository: require('./repository/user-repository/UserRepository')
   
}