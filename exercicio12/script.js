function atualizarContador(input) {
  const contador = document.getElementById('contador');
  if (!contador) return;
  const len = input.value.length;
  contador.textContent = len + '/15';
  contador.classList.toggle('limite', len >= 15);
}

document.addEventListener('DOMContentLoaded', function () {
  const form        = document.getElementById('formEscada');
  const inputMeta   = document.getElementById('meta');
  const selectNivel = document.getElementById('niveis');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    let valido = true;

    const erroMeta = document.getElementById('erro-meta');
    if (!inputMeta.value.trim()) {
      erroMeta.classList.add('visivel');
      inputMeta.classList.add('invalido');
      valido = false;
    } else {
      erroMeta.classList.remove('visivel');
      inputMeta.classList.remove('invalido');
    }

    const erroNivel = document.getElementById('erro-niveis');
    if (!selectNivel.value) {
      erroNivel.classList.add('visivel');
      valido = false;
    } else {
      erroNivel.classList.remove('visivel');
    }

    if (!valido) {
      e.preventDefault();
      const primeiro = form.querySelector('.invalido, .form-error.visivel');
      if (primeiro) primeiro.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  inputMeta.addEventListener('input', function () {
    if (this.value.trim()) {
      document.getElementById('erro-meta').classList.remove('visivel');
      this.classList.remove('invalido');
    }
  });

  selectNivel.addEventListener('change', function () {
    if (this.value) {
      document.getElementById('erro-niveis').classList.remove('visivel');
    }
  });
});