<?php

/* ═══════════════════════════════════════════════════════════════
   conexao.php
   Responsabilidade: criar e retornar a conexão PDO com o banco.
   Todos os arquivos que precisam do banco fazem:
     require_once __DIR__ . '/conexao.php';
   e já têm $pdo disponível.

   Nota: na entrega 1 este arquivo existe mas ainda não é usado
   pelo processar.php (sem banco). Será ativado na entrega 2.
═══════════════════════════════════════════════════════════════ */

$host    = 'db';             // nome do serviço no docker-compose
$dbname  = 'novos_titans_db';
$usuario = 'root';
$senha   = 'root';
$charset = 'utf8mb4';

$dsn = "mysql:host={$host};dbname={$dbname};charset={$charset}";

$opcoes = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $usuario, $senha, $opcoes);
} catch (PDOException $e) {
    /* Em produção nunca exiba detalhes do erro ao usuário.
       Para desenvolvimento, exibimos a mensagem. */
    http_response_code(500);
    die(json_encode([
        'erro' => 'Falha na conexão com o banco de dados.',
        'detalhe' => $e->getMessage(), // remover em produção
    ]));
}