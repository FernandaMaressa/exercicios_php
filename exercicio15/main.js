document.addEventListener('DOMContentLoaded', () => {
    const form       = document.getElementById('form-simulacao');
    const inputValor = document.getElementById('valor_inicial');
    const inputMeta  = document.getElementById('meta');
    const erroValor  = document.getElementById('erro-valor');
    const erroMeta   = document.getElementById('erro-meta');
    const btnNova    = document.getElementById('btn-nova');

    // --- Helpers ---
    function setErro(input, span, msg) {
        span.textContent = msg;
        input.classList.add('input--erro');
    }

    function clearErro(input, span) {
        span.textContent = '';
        input.classList.remove('input--erro');
    }

    function validarValorInicial() {
        const val = parseFloat(inputValor.value);
        if (inputValor.value.trim() === '') {
            setErro(inputValor, erroValor, 'O valor inicial é obrigatório.');
            return false;
        }
        if (isNaN(val) || val <= 0) {
            setErro(inputValor, erroValor, 'O valor inicial deve ser maior que zero.');
            return false;
        }
        clearErro(inputValor, erroValor);
        return true;
    }

    function validarMeta() {
        const meta  = parseFloat(inputMeta.value);
        const valor = parseFloat(inputValor.value);

        if (inputMeta.value.trim() === '') {
            setErro(inputMeta, erroMeta, 'A meta financeira é obrigatória.');
            return false;
        }
        if (isNaN(meta) || meta <= 0) {
            setErro(inputMeta, erroMeta, 'A meta deve ser um número maior que zero.');
            return false;
        }
        if (!isNaN(valor) && meta <= valor) {
            setErro(inputMeta, erroMeta, 'A meta deve ser maior que o valor inicial.');
            return false;
        }
        clearErro(inputMeta, erroMeta);
        return true;
    }

    // --- Validação em tempo real ---
    inputValor.addEventListener('input', () => {
        validarValorInicial();
        if (inputMeta.value.trim() !== '') validarMeta();
    });

    inputMeta.addEventListener('input', validarMeta);

    // --- Validação no submit ---
    form.addEventListener('submit', (e) => {
        const valorOk = validarValorInicial();
        const metaOk  = validarMeta();
        if (!valorOk || !metaOk) {
            e.preventDefault();
        }
    });

    // --- Botão Nova Simulação ---
    btnNova.addEventListener('click', () => {
        inputValor.value = '';
        inputMeta.value  = '';
        clearErro(inputValor, erroValor);
        clearErro(inputMeta, erroMeta);
        inputValor.focus();
    });
});