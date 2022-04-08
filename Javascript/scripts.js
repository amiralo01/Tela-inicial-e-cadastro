class Validator {
    constructor() {
        this.validations = [
            'data-min-length', 
            'data-max length',
            'data-only-letters',
            'data-email-validate',
            'data-required',
            'data-equal',
            'data-password-validate',
            'data-CPF-validate',
        ]
    }
    validate(form){
        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length) {
        this.cleanValidations(currentValidations);
        }
        let inputs = form.getElementsByTagName('input');
        let inputsArray = [...inputs];
        inputsArray.forEach(function(input) {
            for(let i = 0; this.validations.legth > i; i++) {
                if(input.getAttribute(this.validations[i]) != null) {
                    let method = this.validations[i].replace('data-', '').replace('-', '');
                    let value = input.getAttribute(this.validations[i]);
                    this [method](input, value);
                }
            }
        }, this);
    }
    minlegth(input, minValue) {
        let inputLength = input.value.length;
        let errorMessage = "O campo precisa ter pelo menos ${minValue} caracteres";
        if(inputLenght <minValue) {
            this.printMessage(input, errorMessage);
        }
    }

    maxlength(input, maxValue) {
        let inputLength = input.value.length;
        let errorMessage = 'O campo precisa ter menos que ${maxValue} caracteres';
        if(inputLength > maxValue) {
            this.pritMessage(input, errorMessage);
        }
    }

    onlyletters(input) {
        let re = /^[A-Za-z]+$/;;
        let inputValue = input.value;
        let errorMessage = 'Este campo não aceita números nem caracteres especiais';
        if(!re.test(inputValue)) {
            this.printMessage(input, errorMessage);
        }
    }

    emailvalidate(input) {
        let re = /\S+@\S+\.\S+/;
        let email = input.value;
        let errorMessage = 'Insira um e-mail no padrão fulano@gmail.com';
        if(!re.test(email)) {
            this.printMessage(input, errorMessage);
        }
    }

    equal(input, inputName) {
        let inputToCompare = document.getElementsByName(inputName) [0];
        let errorMessage = 'Este campo precisa estar igual ao ${inputName}';
        if(input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage);
        }
    }

    required(input) {
        let inputValue = input.Value;
        if(inputValue === '') {
            let errorMessage = 'Este campo é obrigatório';
            this.pritMessage(input, errorMessage);
        }
    }
    passwordvalidate(input) {
        let charArr = input.Value.split("");
        let uppercases = 0;
        let numbers = 0;

        for(let i = 0; charArr.legth> i; i++) {
            if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
                uppercases++;
            }else if(!isNaN(parseInt(charArr[i]))) {
                numbers++;
            }
        }
        if(uppercases === 0|| numbers === 0) {
            let errorMessage = 'A senha precisa um caractere maiúsculo e um número';
            this.printMessage(input, errorMessage);
        }
    }

    pritMessage(input, msg) {
        let errorsQty = input.parentNode.querySelector('.error-validation');
        if(errorsQty === null) {
            let template = document.querySelector('.error-validation').cloneNode(true);
            template.textContent = msg;
            let inputParent= input.parentMode;
            template.classList.remove('template');
            inputParent.appendChild(template);
        }
    }
    clenValidations(validations) {
        validations.forEach(el => el.remove());
    }
}
let form = document.getElementById('register-form');
let submit = document.getElementById('btn-submit');
let validator = new Validator();

function verificarCPF(c){
    var i;
    s = c;
    var c = s.substr(0,9);
    var dv = s.substr(9,2);
    var d1 = 0;
    var v = false;
 
    for (i = 0; i < 9; i++){
        d1 += c.charAt(i)*(10-i);
    }
    if (d1 == 0){
        alert("CPF Inválido")
        v = true;
        return false;
    }
    d1 = 11 - (d1 % 11);
    if (d1 > 9) d1 = 0;
    if (dv.charAt(0) != d1){
        alert("CPF Inválido")
        v = true;
        return false;
    }
 
    d1 *= 2;
    for (i = 0; i < 9; i++){
        d1 += c.charAt(i)*(11-i);
    }
    d1 = 11 - (d1 % 11);
    if (d1 > 9) d1 = 0;
    if (dv.charAt(1) != d1){
        alert("CPF Inválido")
        v = true;
        return false;
    }
    if (!v) {
        alert(c + "nCPF Válido")
    }
}

submit.addEventListener('click', function(e) {
    e.preventDefault();
    validator.validate(form);
});