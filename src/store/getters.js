const getters = {
  requestLoading: state => state.app.requestLoading,
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  phone: state => state.user.phone,
  roles: state => state.user.roles
}
export default getters
