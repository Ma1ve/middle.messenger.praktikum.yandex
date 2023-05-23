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
    regExp: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10,15}$/,
    errorMessage: "Номер состоит из цифр от 10 до 15 символов",
  },
  password: {
    regExp: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    errorMessage: "Пароль от 8 до 40, заглавная буква и цифра",
  },
  first_name: {
    regExp: /^[А-ЯA-Z]{1}[а-яa-z-]*$/,
    errorMessage: "Первая буква заглавная, без пробелов и цифр",
  },
  second_name: {
    regExp: /^[А-ЯA-Z]{1}[а-яa-z-]*$/,
    errorMessage: "Первая буква заглавная, без пробелов и цифр",
  },
  email: {
    regExp: /^[A-Za-z0-9\-]+@[A-Za-z]+(\.[A-Za-z]+)+$/,
    errorMessage: "Введите корректный email",
  },
  message: {
    regExp: /^.+$/,
    errorMessage: "Поле не должно быть пустым",
  },
  chat_name: {
    regExp: /^[А-ЯA-Z]{1}[а-яa-z-]*$/,
    errorMessage: "Первая буква заглавная, без пробелов и цифр",
  },
};

const validationCheck = (event: InputEvent): void => {
  const targetInput = event.target as HTMLInputElement;
  const parent = targetInput.parentElement;
  const error = parent?.querySelector(".error-input");

  parent!.style.position = "relative";

  const nameInput = validationInputs[targetInput.name];
  const isValid = nameInput.regExp.test(targetInput.value);

  if (!isValid) {
    error!.textContent = nameInput.errorMessage;
  } else {
    error!.textContent = "";
  }
};

export const submit = (event: Event): void => {
  event.preventDefault();
  const inputs = document.getElementsByTagName("input");

  // const isValid = Array.from(inputs).every((inputElement) => {
  //   const { regExp } = validationInputs[inputElement.name];
  //   console.log(inputElement.name);
  //   if (!regExp.test(inputElement.value)) {
  //     //! Очищает значение input, если не соответствует регулярному выражению

  //     inputElement.value = "";
  //   }
  //   //! Возвращает true, если значение input соответствует регулярному выражению, иначе false
  //   return regExp.test(inputElement.value);
  // });

  const isValid = Array.from(inputs).every((inputElement) => {
    const { regExp } = validationInputs[inputElement.name];
    console.log(inputElement.name);
    if (!regExp.test(inputElement.value)) {
      //! Очищает значение input, если не соответствует регулярному выражению

      inputElement.value = "";
    }
    //! Возвращает true, если значение input соответствует регулярному выражению, иначе false
    console.log(regExp.test(inputElement.value));
    return regExp.test(inputElement.value);
  });

  if (isValid) {
    const data: Record<string, string> = {};
    Array.from(inputs).forEach((input) => {
      data[input.name] = input.value;
    });
    //! Пока что сделал так, когда все поля заполнены правильно, и мы находимся на страницу login перекидывает на страницу chat
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/"
    ) {
      window.location.href = "/chat";
    }
    console.log(data);
  }
};

export const focusin = (event: InputEvent): void => {
  validationCheck(event);
};

export const focusout = (event: InputEvent): void => {
  validationCheck(event);
};

// export { focusout, focusin, submit };
