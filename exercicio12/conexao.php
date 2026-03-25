<?php
// ============================================================
// conexao.php — Escada da Motivação • Exercício 12
// Conexão com MySQL via PDO
// ============================================================

$host    = 'db';              
$dbname  = 'novos_titans_db';
$user    = 'root';
$pass    = 'root';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";

$opcoes = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $opcoes);
} catch (PDOException $e) {
    die('<p style="color:red;font-family:Arial;padding:20px;">
        Erro de conexão com o banco de dados: ' . $e->getMessage() . '
    </p>');
}