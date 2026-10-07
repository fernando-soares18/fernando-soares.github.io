// Nandolino 2.1 — configuração pública do front-end.
// Esta URL NÃO é uma chave nem um segredo. É apenas o endereço HTTPS do webhook.
// ATENÇÃO: o endereço trycloudflare.com abaixo é um Quick Tunnel temporário.
// Se o cloudflared for reiniciado e gerar outro endereço, troque SOMENTE a linha endpoint.
window.NANDOLINO_CONFIG = Object.freeze({
  enabled: true,
  endpoint: 'https://influence-footwear-ensemble-chan.trycloudflare.com/webhook/nandolino',
  timeoutMs: 120000
});
