/* 
   Responsabilidade: interações do frontend
   - highlight de campos com erro ao digitar
   - scroll suave até o resultado após submit
   - animação das barras de estatística (entrega 3)
   - comentarios explicando o que fiz
 */

document.addEventListener('DOMContentLoaded', function () {

  /*  1. Remove classe de erro ao digitar no campo  */
  const inputs = document.querySelectorAll('.form-input');

  inputs.forEach(function (input) {
    input.addEventListener('input', function () {
      if (input.classList.contains('input-erro')) {
        input.classList.remove('input-erro');

        const field   = input.closest('.form-field');
        const hintErr = field ? field.querySelector('.hint-erro') : null;

        if (hintErr) {
          hintErr.textContent = '';
          hintErr.classList.remove('hint-erro');
        }
      }
    });
  });


  /*  2. Scroll suave até o resultado (se existir)  */
  const resultado = document.querySelector('[data-cy="resultado"]');

  if (resultado) {
    setTimeout(function () {
      resultado.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }


  /*  3. Animação das barras de estatística  */
  /*
     As barras são alimentadas com dados reais na entrega 3.
     Por enquanto, a função está preparada para receber
     um array de { slug, count, total } e animar as barras.
  */
  function animarBarras(dados) {
    dados.forEach(function (item) {
      const bar = document.querySelector('[data-cy="stat-bar-' + item.slug + '"]');
      const pct = document.querySelector('[data-cy="stat-pct-' + item.slug + '"]');
      const cnt = document.querySelector('[data-cy="stat-count-' + item.slug + '"]');

      if (!bar || !pct || !cnt) return;

      const percentual = item.total > 0
        ? Math.round((item.count / item.total) * 100)
        : 0;

      cnt.textContent = item.count;
      pct.textContent = percentual + '%';

      /* Anima a barra com requestAnimationFrame */
      let start = null;
      const duracao = 600;
      const larguraAlvo = percentual;

      function step(timestamp) {
        if (!start) start = timestamp;
        const progresso = Math.min((timestamp - start) / duracao, 1);
        bar.style.width = (progresso * larguraAlvo) + '%';
        if (progresso < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    });
  }

  /* Expõe a função para uso futuro na entrega 3 */
  window.animarBarras = animarBarras;


  /*  4. Confirmação antes de limpar histórico  */
  const formLimpar = document.querySelector('[data-cy="form-limpar"]');

  if (formLimpar) {
    formLimpar.addEventListener('submit', function (e) {
      const confirmado = window.confirm(
        'Apagar todos os registros?\nEsta ação não pode ser desfeita.'
      );
      if (!confirmado) {
        e.preventDefault();
      }
    });
  }

});