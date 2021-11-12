const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  isSuperAdmin: state => state.user.isSuperAdmin,
  admin: state => state.user.admin
}
export default getters
