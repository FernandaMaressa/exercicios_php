<?php
/** Classifica a pontuação em níveis qualitativos.
 *
 * @param  float  $pontuacao  Pontuação a ser classificada (0–10)
 * @return string             Nível qualitativo
 */
function classificarNivel(float $pontuacao): string
{
    if ($pontuacao < 0 || $pontuacao > 10) {
        throw new InvalidArgumentException("Pontuação fora do intervalo válido: $pontuacao");
    }

    if ($pontuacao >= 8.5) return 'EXCELENTE';
    if ($pontuacao >= 7.0) return 'BOM';
    if ($pontuacao >= 5.0) return 'MÉDIO';
    return 'BAIXO';
}

/** Calcula o percentual de pontuações na faixa BOM.
 * @param  int  $bons   Quantidade de pontuações na faixa BOM
 * @param  int  $total  Total de pontuações
 * @return float        Percentual (0–100)
 */
function calcularPercentual(int $bons, int $total): float
{
    if ($total === 0) return 0.0;
    return round(($bons / $total) * 100, 1);
}

/** Valida e converte uma pontuação de string para float.
 *  @param  mixed  
 * @return float|null
 */
function validarPontuacao(mixed $valor): ?float
{
    if ($valor === null || $valor === '') return null;

    $val = filter_var(str_replace(',', '.', $valor), FILTER_VALIDATE_FLOAT);
    if ($val === false) return null;

    if ($val === -1.0)                     return -1.0;
    if ($val >= 0.0 && $val <= 10.0)       return $val;

    return null;
}