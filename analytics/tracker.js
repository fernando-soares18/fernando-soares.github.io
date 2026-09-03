(function () {
  'use strict';

  var config = window.PORTFOLIO_ANALYTICS || {};
  var endpoint = (config.supabaseUrl || '').replace(/\/$/, '');
  var anonKey = config.supabaseAnonKey || '';
  var enabled = Boolean(endpoint && anonKey);
  var visitorKey = 'fs_portfolio_visitor_id';

  function makeId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') return window.crypto.randomUUID();
    return 'v_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 12);
  }

  function getVisitorId() {
    try {
      var current = localStorage.getItem(visitorKey);
      if (!current) {
        current = makeId();
        localStorage.setItem(visitorKey, current);
      }
      return current;
    } catch (_) {
      return makeId();
    }
  }

  function cleanMeta(meta) {
    var safe = {};
    if (!meta || typeof meta !== 'object') return safe;
    Object.keys(meta).slice(0, 8).forEach(function (key) {
      var value = meta[key];
      if (typeof value === 'string') safe[key] = value.slice(0, 180);
      else if (typeof value === 'number' || typeof value === 'boolean') safe[key] = value;
    });
    return safe;
  }

  window.analyticsTrack = function (eventName, meta) {
    if (!enabled || !eventName) return Promise.resolve(false);

    var payload = {
      visitor_id: getVisitorId(),
      event_name: String(eventName).slice(0, 60),
      page: location.pathname.slice(0, 180),
      meta: cleanMeta(meta)
    };

    return fetch(endpoint + '/rest/v1/analytics_events', {
      method: 'POST',
      headers: {
        'apikey': anonKey,
        'Authorization': 'Bearer ' + anonKey,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(payload),
      keepalive: true
    }).then(function (response) {
      return response.ok;
    }).catch(function () {
      return false;
    });
  };

  // Uma visualização por carregamento de página. Visitante único é calculado pelo visitor_id.
  window.analyticsTrack('page_view', { referrer: document.referrer ? 'external_or_internal' : 'direct' });

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a');
    if (!link) return;
    var href = link.getAttribute('href') || '';
    var text = (link.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80);

    if (/wa\.me|whatsapp/i.test(href)) {
      window.analyticsTrack('whatsapp_click', { label: text });
      return;
    }
    if (link.closest('.featured-project, .project-card, .project-note')) {
      window.analyticsTrack('project_click', { label: text, href: href.slice(0, 160) });
    }
  }, true);
})();
