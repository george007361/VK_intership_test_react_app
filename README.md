# Тестовое задание 
## Выполинл: Георгий Илларионов

### Запуск
1. ```npm ci``` - установить зависимости
2. ```npm run dev``` - локальный сервер для разработки
3. ```npm run prod``` - локальный сервер для прод сборки

> При запуске должен открыться браузер, если нет, то \
> `http://localhost:8123/` для `dev` \
> и скорее всего `http://localhost:4173/` для `prod` 

### Использовал
- `vite` - сборщик
- `react + typescript` - основной фремворк
- `react-hook-form` - библиотека для работы с формами (в задаче про возраст)
- `yup` - библиотека валидации полей в формах (в задаче про возраст)
- `tanstack query ` - для работы с сетью (не использовал ранее никогда, так что мб не очень правильно с ней работаю)
- `axios` - для отправки запросов
- `VK UI` - ui-kit для интерфейса
- `VK Icons` - иконки

### Что сделано?
`SPA` с двумя страницами для двух задач. \
Благодаря `VK UI` более или менее адаптировано под мобильные устроств. \
Постарался выполнить архитектуру `feature sliced design`


### Что не сделал?
Мини-приложение