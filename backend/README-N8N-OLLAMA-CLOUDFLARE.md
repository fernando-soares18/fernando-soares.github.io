# Nandolino 2.1 — n8n + Ollama + Cloudflare Tunnel

## Fluxo
Portfólio -> Cloudflare Tunnel -> Webhook n8n -> AI Agent -> Ollama Chat Model -> Respond to Webhook.

## Webhook de produção
O front-end usa `/webhook/nandolino`. O workflow precisa estar publicado/ativo no n8n.

## Response Body do Respond to Webhook
Use `Respond With: JSON` e, em modo Expression:

```text
{{ JSON.stringify({ "reply": $json.output }) }}
```

## Cloudflared
Quando a rede bloquear QUIC/UDP 7844, force HTTP/2:

```powershell
cloudflared tunnel --protocol http2 --url http://localhost:5678
```

Ao aparecer `Registered tunnel connection ... protocol=http2`, copie a URL `https://...trycloudflare.com` para `nandolino/config.js`.

Quick Tunnel é temporário. Para publicação definitiva, use Named Tunnel/hostname estável.

## Produção
- Restrinja CORS ao domínio do portfólio.
- Aplique rate limit.
- Limite o tamanho da mensagem também no backend.
- Não exponha credenciais no HTML/JS.
- Mantenha o System Prompt baseado apenas em informações profissionais autorizadas.
