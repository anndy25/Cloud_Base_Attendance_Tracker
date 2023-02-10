// database related modules
module.exports = {
  
    databaseConnection: require('./connection'),
    AdminUserRepository: require('./repository/admin/AdminUserRepository'),
    UserRepository: require('./repository/user/UserRepository')
   
}