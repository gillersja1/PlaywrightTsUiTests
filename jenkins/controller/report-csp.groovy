// The Playwright HTML report needs inline scripts, which the default Jenkins CSP blocks.
System.setProperty(
    'hudson.model.DirectoryBrowserSupport.CSP',
    "sandbox allow-scripts allow-same-origin; default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:;"
)
