<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reserva de Sala de Estudo</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<h2>Reserva de Sala de Estudo</h2>

<form action="processar.php" method="POST">
    <label for="nome_sala">Nome da Sala:</label>
    <input type="text" id="nome_sala" name="nome_sala" required placeholder="Ex: Sala 101">

    <label for="periodo">Período da Reserva:</label>
    <select id="periodo" name="periodo" required>
        <option value="">Selecione o período</option>
        <option value="Manhã">Manhã</option>
        <option value="Tarde">Tarde</option>
        <option value="Noite">Noite</option>
    </select>

    <label for="responsavel">Nome do Responsável:</label>
    <input type="text" id="responsavel" name="responsavel" required placeholder="Seu nome completo">

    <button type="submit">Gerar Reserva</button>
</form>

</body>
</html>
