export const getLanguage = (file) => {
  const ext = file.split('.').pop();
  switch (ext.toLowerCase()) {
    case 'js':
      return 'javascript';
    case 'ts':
      return 'typescript';
    case 'json':
      return 'json';
    default:
      return 'text';
  }
};
