module.exports = {
  extends: ['prettier', 'next'],
  plugins: ['import', 'jsx-a11y', 'react', 'react-hooks', 'prettier'],
  rules: {
    'import/extensions': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'react-hooks/rules-of-hooks': 'off',
  },
};
