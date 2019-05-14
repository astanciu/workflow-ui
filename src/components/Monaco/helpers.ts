export const configureMonacoEnv = () => {
  // @ts-ignore
  window.MonacoEnvironment = {
    getWorkerUrl: function(moduleId, label) {
      if (label === 'json') return '/json.worker.js';
      if (label === 'typescript' || label === 'javascript') return '/typescript.worker.js';

      return '/editor.worker.js';
    },
    getWorker: function(moduleId, label) {
      if (label === 'json') return new Worker('/json.worker.js');
      if (label === 'typescript' || label === 'javascript') return new Worker('/typescript.worker.js');

      return new Worker('/editor.worker.js');
    },
  };
};

export const configureMonaco = (monaco) => {
  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: false,
  });
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES6,
    allowNonTsExtensions: true,
  });
  monaco.editor.defineTheme('workflows', {
    base: 'vs',
    inherit: true,
    rules: [{ background: '#dbe2e6' }],
    colors: {
      'editor.background': '#dbe2e6',
      'editor.lineHighlightBackground': '#dbe1e6',
    },
  });
  monaco.editor.setTheme('workflows');
};
