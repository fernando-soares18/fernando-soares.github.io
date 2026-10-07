# Fernando Soares | Portfólio — Nandolino Skynet 2.1

Portfólio de Fernando Soares com projetos Front-end, Code Snake, calculadora e o Nandolino: um assistente integrado a IA local através de n8n + Ollama + Cloudflare Tunnel.

## Acesse

- Portfólio: https://fernando-soares18.github.io/fernando-soares.github.io/
- Projeto Dr. Charles Genehr: https://drcharlesgenehr.com.br
- GitHub: https://github.com/fernando-soares18

## Nandolino 2.1 — arquitetura

Fluxo atual:

`GitHub Pages -> HTTPS Cloudflare Tunnel -> n8n -> AI Agent -> Ollama/Qwen -> Respond to Webhook -> Portfólio`

O navegador envia POST JSON no formato:

```json
{
  "message": "pergunta do visitante",
  "sessionId": "uuid",
  "source": "portfolio",
  "language": "pt-BR",
  "page": "url"
}
```

O n8n devolve:

```json
{"reply":"resposta do Nandolino"}
```

### Configuração do endpoint

O arquivo `nandolino/config.js` concentra a URL do webhook. Não existe chave privada no front-end.

O endereço `trycloudflare.com` configurado no ZIP é um **Quick Tunnel temporário**. Quando ele mudar, edite somente `endpoint` em `nandolino/config.js`.

Para subir o túnel atual usando HTTP/2:

```powershell
cloudflared tunnel --protocol http2 --url http://localhost:5678
```

Depois mantenha rodando:

1. Ollama com o modelo usado pelo fluxo.
2. n8n com o workflow publicado.
3. cloudflared com o túnel ativo.

O timeout do front-end está em 120 segundos porque uma IA local pode levar dezenas de segundos para responder em hardware doméstico. Se o backend cair, o Nandolino usa respostas locais como fallback.

## Segurança

- Nenhuma chave de IA é publicada no GitHub Pages.
- O texto retornado pela IA é tratado como texto, não como HTML executável.
- Links de ações aceitam apenas HTTPS ou caminhos relativos.
- A entrada do chat é limitada a 600 caracteres no front-end.
- Para produção, aplique rate limit no n8n e restrinja CORS ao domínio do portfólio.
- Para URL estável, substitua o Quick Tunnel por um Cloudflare Named Tunnel.

## Projetos e recursos

- Dr. Charles Genehr: projeto real para cliente.
- Netflix Clone.
- Cronômetro.
- Calculadora Interativa.
- Code Snake com controles por teclado, mouse/toque e recorde persistente.
- Nandolino com voz, reconhecimento de fala, atalhos, fallback local e IA via webhook.
- Painel opcional de métricas com Supabase.

## Analytics

O painel secreto continua em `analytics.html`. Para ativar, configure `analytics/config.js` com URL e chave anon/publishable do Supabase e rode `analytics/setup.sql`. Nunca use `service_role` no front-end.
