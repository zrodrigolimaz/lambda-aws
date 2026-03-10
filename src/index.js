exports.handler = async (event) => {
  let nome = "Visitante";

  if (event.body) {
    try {
      const body = JSON.parse(event.body);
      nome = body.nome || nome;
    } catch (_) {}
  } else if (event.queryStringParameters?.nome) {
    nome = event.queryStringParameters.nome;
  } else if (event.nome) {
    nome = event.nome;
  }

  const mensagem = `Olá, ${nome}! Esta é minha primeira Lambda.`;
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({ message: mensagem })
  };
};
