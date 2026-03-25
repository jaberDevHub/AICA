// AI Model Configuration - Secure File
(function() {
    'use strict';
    
    // Configuration data - encoded for security
    const configs = {
        'Qwen-Local': {
            apiBase: atob('aHR0cDovLzc5LjcyLjEzLjg1OjgwODAvdjE='),
            model: atob('UXdlbjM=')
        },
        'KIMI-Local': {
            apiBase: atob('aHR0cDovLzE1NC41NC4xMDAuNzg6ODA5MC92MQ=='),
            model: atob('S0lNSQ==')
        },
        'Qwen3-14B-Local': {
            apiBase: atob('aHR0cDovLzEwOS4xOTYuMTc0LjE5OjExNDM0L3Yx'),
            model: atob('UXdlbjMtMTRC')
        },
        'GLM-4.7-Local': {
            apiBase: atob('aHR0cDovLzExNC41NS4zLjU3OjgwMTIvdjE='),
            model: atob('R0xNLTQuNw==')
        },
        'step-3.5-flash-Local': {
            apiBase: atob('aHR0cDovLzQ3LjE4NC4xMTQuMTU0OjYwMDAwL3Yx'),
            model: atob('c3RlcC0zLjUtZmxhc2g=')
        },
        'GLM-4.7-Flash-REAP-23B-A3B-Q4_K_M-Local': {
            apiBase: atob('aHR0cDovLzE0MS4xNDUuMjAyLjE1ODo4MDgwL3Yx'),
            model: atob('R0xNLTQuNy1GbGFzaC1SRUFQ')
        },
        'ggml-org-gpt-oss-120b': {
            apiBase: atob('aHR0cDovLzIxMi4yMzUuMTg5LjE3MDo5MDAxL3Yx'),
            model: atob('Z2dtbC1vcmctZ3B0LW9zcw==')
        }
    };
    
    // Secure configuration access
    function getConfig() {
        return configs;
    }
    
    // Export to global scope
    if (typeof window !== 'undefined') {
        window._0xgetModelConfig = getConfig;
        console.log('Configuration loaded successfully');
    }
    
})();
