interface Patterns {
  regExp: RegExp;
  errorMessage: string;
}

const validationInputs: Record<string, Patterns> = {
  login: {
    regExp: /^(?!^\d+)[a-zA-z0-9-_]{3,20}$/,
    errorMessage: "Логин должен содержать от 3 до 20 символов",
  },
  phone: {
    /* /^\+?\d{10,15}$/, */
    regExp: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10, 15}$/,
    errorMessage:
      "Номер должен состоять из цифр, содержать от 10 до 15 символов",
  },
  password: {
    regExp: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    errorMessage:
      "Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
  },
  first_name: {
    regExp: /^[А-ЯA-Z]{1}[а-яa-z-]*$/,
    errorMessage:
      "Первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов(допустим только дефис)",
  },
  second_name: {
    regExp: /^[А-ЯA-Z]{1}[а-яa-z-]*$/,
    errorMessage:
      "Первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов(допустим только дефис)",
  },
  email: {
    regExp: /^[A-Za-z0-9\-]+@[A-Za-z]+(\.[A-Za-z]+)+$/,
    errorMessage: "",
  },
  message: {
    regExp: /^.+$/,
    errorMessage: "Поле не должно быть пустым",
  },
};

const validationCheck = (event: InputEvent): void => {
  const targetInput = event.target as HTMLInputElement;
  const parent = targetInput.parentElement;

  //! Создаем div с классом error, в котором будем обрабатывать ошибку
  const error = document.createElement("div");
  error.classList.add("error");

  const nameInput = validationInputs[targetInput.name];
  const isValid = nameInput.regExp.test(targetInput.value);

  if (!isValid) {
    error.textContent = nameInput.errorMessage;
    parent?.appendChild(error);
  } else {
    parent?.removeChild(error);
  }
};

export const submit = (event: Event): void => {
  event.preventDefault();
  const inputs = document.getElementsByTagName("input");
  const inputsArray = Array.from(inputs);

  const isValid = Array.from(inputs).every((inputElement) => {
    const { regExp } = validationInputs[inputElement.name];
    if (!regExp.test(inputElement.value)) {
      //! Очищает значение input, если не соответствует регулярному выражению
      inputElement.value = "";
    }
    //! Возвращает true, если значение input соответствует регулярному выражению, иначе false
    return regExp.test(inputElement.value);
  });

  if (isValid) {
    const data: Record<string, string> = {};
    inputsArray.forEach((input) => {
      data[input.name] = input.value;
    });

    console.log(data);
  }
};

export const focusin = (event: InputEvent): void => {
  validationCheck(event);
};

export const focusout = (event: InputEvent): void => {
  validationCheck(event);
};
