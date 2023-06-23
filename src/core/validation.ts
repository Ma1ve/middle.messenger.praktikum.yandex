import AuthController from "../services/AuthController";
import UserController from "../services/UserController";

interface Patterns {
  regExp: RegExp;
  errorMessage: string;
}

const validationInputs: Record<string, Patterns> = {
  login: {
    regExp: /^(?!^\d+)[a-zA-Z0-9-_]{3,20}$/,
    errorMessage: "Логин должен содержать от 3 до 20 символов",
  },
  phone: {
    regExp: /^((8|\+7)[ -]?)?(\(?\d{3}\)?[ -]?)?[\d -]{10,15}$/,
    errorMessage: "Номер состоит из цифр от 10 до 15 символов",
  },
   password: {
    regExp: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    errorMessage: "Пароль от 8 до 40, заглавная буква и цифра",
  },
  oldPassword: {
    regExp: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    errorMessage: "Пароль от 8 до 40, заглавная буква и цифра",
  },
  newPassword: {
    regExp: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    errorMessage: "Пароль от 8 до 40, заглавная буква и цифра",
  },
  confirmPassword: {
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
  display_name: {
    regExp: /(?!^\d+$)^[a-zA-Z0-9_-]{3,40}$/,
    errorMessage: 'Имя должно состоять не менее чем из 3 символов',
  },
  email: {
    regExp: /^[A-Za-z0-9-]+@[A-Za-z]+(\.[A-Za-z]+)+$/,
    errorMessage: "Введите корректный email",
  },
  message: {
    regExp: /^.+$/,
    errorMessage: "Поле не должно быть пустым",
  }
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

export const focusin = (event: InputEvent): void => {
  validationCheck(event);
};

export const focusout = (event: InputEvent): void => {
  validationCheck(event);
};


const currentApiRequest = (data: Record<string, string>) => {
  const currentRouter = window.location.pathname;

  switch (currentRouter) {
    case '/': {
      window.store.dispatch(AuthController.signIn, data)
      break;
    }
    case '/sign-up': {
      window.store.dispatch(AuthController.signUp, data)
      break;
    }
    case '/settings/data': {
      window.store.dispatch(UserController.updateUser, data)
      break;
    }
    case '/settings/password': {
      window.store.dispatch(UserController.updatePassword, data)
      break;
    }



    default:
      break;
  }

}



export const submit = (event: Event): void => {
  event.preventDefault();

  const formInputs = document.querySelectorAll<HTMLInputElement>("#my-input");

  const data: Record<string, string> = {};

  formInputs.forEach((input: HTMLInputElement) => {
    const error = input.parentElement?.querySelector(".error-input");
    const currentValidationInput = validationInputs[input.name];

    const { regExp } = currentValidationInput;

    if (input.value === "" || !regExp.test(input.value)) {
      error!.textContent = currentValidationInput.errorMessage;
    } else {
      error!.textContent = "";
      data[input.name] = input.value;
    }
  });




  if (Object.keys(data).length === formInputs.length) {
    console.log(data);
    currentApiRequest(data)
  }
};


