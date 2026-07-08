(function () {
    function resolveApiBase() {
        const path = window.location.pathname.replace(/\\/g, '/');

        if (path.includes('/admin/')) {
            return '..';
        }

        return '.';
    }

    window.API_BASE = resolveApiBase();

    function splitEndpoint(endpoint) {
        const raw = String(endpoint || '').replace(/^\//, '');
        const queryIndex = raw.indexOf('?');
        const path = queryIndex >= 0 ? raw.slice(0, queryIndex) : raw;
        const query = queryIndex >= 0 ? raw.slice(queryIndex) : '';

        return { path, query };
    }

    window.apiUrl = function apiUrl(endpoint) {
        const base = window.API_BASE.replace(/\/$/, '');
        const { path, query } = splitEndpoint(endpoint);

        const produtoIdMatch = path.match(/^api\/produtos\/(\d+)$/);
        if (produtoIdMatch) {
            return `${base}/api/produto.php?id=${produtoIdMatch[1]}${query ? '&' + query.slice(1) : ''}`;
        }

        const routeMap = {
            'api/equipamentos': 'api/equipamentos.php',
            'api/health': 'api/health.php',
            'api/produtos': 'api/produtos.php',
            'api/produtos/next-exemplar': 'api/produtos-next-exemplar.php',
            'api/produtos-listagem': 'api/produtos-listagem.php',
            'api/busca': 'api/busca.php',
        };

        const phpPath = routeMap[path];
        if (phpPath) {
            return `${base}/${phpPath}${query}`;
        }

        return `${base}/${path}${query}`;
    };
})();
