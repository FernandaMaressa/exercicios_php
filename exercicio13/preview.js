(function () {
  const input   = document.getElementById('pontuacao');
  const suffix  = document.getElementById('nivel-preview');
  const hint    = document.getElementById('field-error');
  const btnText = document.querySelector('.btn-text');
  const btn     = document.getElementById('btn-submit');

  if (!input) return;

  const NIVEIS = [
    { min: 8.5, max: 10.0, label: 'EXCELENTE', cls: 'excelente' },
    { min: 7.0, max: 8.4,  label: 'BOM',       cls: 'bom'       },
    { min: 5.0, max: 6.9,  label: 'MÉDIO',     cls: 'medio'     },
    { min: 0.0, max: 4.9,  label: 'BAIXO',     cls: 'baixo'     },
  ];

  const COLORS = {
    bom:       { bg: 'rgba(91,191,122,.18)',  color: '#5bbf7a' },
    excelente: { bg: 'rgba(91,158,232,.18)',  color: '#5b9ee8' },
    medio:     { bg: 'rgba(212,168,67,.18)',  color: '#d4a843' },
    baixo:     { bg: 'rgba(224,92,92,.18)',   color: '#e05c5c' },
  };

  function classificar(val) {
    for (const n of NIVEIS) {
      if (val >= n.min && val <= n.max) return n;
    }
    return null;
  }

  function atualizar() {
    const raw = input.value.trim();
    const val = parseFloat(raw);

    input.classList.remove('is-invalid');
    hint.textContent   = '';
    suffix.textContent = '';
    suffix.style.cssText = '';
    btnText.textContent = 'Registrar Pontuação';
    btn.style.background = '';

    if (raw === '' || raw === '-') return;

    if (val === -1) {
      suffix.textContent       = 'ENCERRAR';
      suffix.style.background  = 'rgba(255,255,255,.08)';
      suffix.style.color       = '#b8b0a2';
      btnText.textContent      = 'Encerrar e Ver Resultado';
      btn.style.background     = '#5b9ee8';
      return;
    }

    if (isNaN(val) || val < 0 || val > 10) {
      input.classList.add('is-invalid');
      hint.textContent = 'Digite um valor entre 0.0 e 10.0, ou -1 para encerrar.';
      return;
    }

    const nivel = classificar(val);
    if (!nivel) return;

    const c = COLORS[nivel.cls];
    suffix.textContent       = nivel.label;
    suffix.style.background  = c.bg;
    suffix.style.color       = c.color;
    suffix.style.border      = `1px solid ${c.color}`;
  }

  input.addEventListener('input',  atualizar);
  input.addEventListener('change', atualizar);
  input.focus();
})();