const userRouter = require('express').Router();

const {
  validateGetUserById,
  /* validateAddUser, */
  validateUpdateProfileInfo,
  validateUpdateProfileAvatar,
} = require('../middlewares/validation');

const {
  getUsers,
  getUserById,
  getCurrentUser,
  /*   addUser, */
  updateProfileInfo,
} = require('../controllers/users');
// вернуть всех пользователей
userRouter.get('/', getUsers);
// возвращает информацию о текущем пользователе
userRouter.get('/me', getCurrentUser);
// вернуть пользователя по _id
userRouter.get('/:userId', validateGetUserById, getUserById);
/* // добавить пользователя
userRouter.post('/', validateAddUser, addUser); */
// обновить профиль
userRouter.patch('/me', validateUpdateProfileInfo, updateProfileInfo);
// обновить аватар
userRouter.patch('/me/avatar', validateUpdateProfileAvatar, updateProfileInfo);

module.exports = { userRouter };
