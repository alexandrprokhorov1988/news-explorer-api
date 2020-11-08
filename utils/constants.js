const BAD_REQUEST_ERR = 'Переданы некорректные данные';
const BAD_REQUEST_ID_ERR = 'Невалидный id';
const CONFLICT_ERR = 'Email занят';
const FORBIDDEN_ERR = 'Отказ в авторизации запроса';
const NOT_FOUND_ERR = 'Запрашиваемый ресурс не найден';
const NOT_FOUND_ITEM_ERR = 'Нет карточки с таким id';
const NOT_FOUND_USER_ITEMS_ERR = 'Записи отсутствуют';
const NOT_FOUND_USER_ERR = 'Нет пользователя с таким id';
const SERVER_ERR = 'На сервере произошла ошибка';
const SUCCESS_DELETE = 'Карточка удалена';
const SUCCESS_LOGIN = 'Авторизация успешна';
const SUCCESS_LOGOUT = 'Вы вышли из аккаунта';
const UNAUTORIZED_ERR = 'Необходима авторизация';
const UNAUTORIZED_DATA_ERR = 'Неправильные почта или пароль';

module.exports = {
  BAD_REQUEST_ERR,
  BAD_REQUEST_ID_ERR,
  CONFLICT_ERR,
  FORBIDDEN_ERR,
  NOT_FOUND_ERR,
  NOT_FOUND_ITEM_ERR,
  NOT_FOUND_USER_ITEMS_ERR,
  NOT_FOUND_USER_ERR,
  SERVER_ERR,
  SUCCESS_DELETE,
  SUCCESS_LOGIN,
  SUCCESS_LOGOUT,
  UNAUTORIZED_ERR,
  UNAUTORIZED_DATA_ERR,
};
