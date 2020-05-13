(function () {
  'use strict';

  const _ = require( 'wTools' );
  require( 'wFiles' );
  require( 'warraysorted' );

  const sortTable = require('./SortTable');

  function abs() { return _.path.s.join( __dirname, ... arguments ) }

  const columns = [
    { tableTitle : 'Module', dataTitle : 'npmName' },
    { '' : '' },
    { 'Binding' : 'binding' },
    { 'Solves SLE' : 'solvesSLE' },
    { 'Dependents' : 'dependents' },
    { 'Node.js' : 'supportsNodejs' },
    { 'Browser' : 'supportsBrowser' }
  ];

  let columnTitleRow = '|№|';
  let subColumnTitleRow = '|:-:|';
  columns.forEach((column) => {
    columnTitleRow += column + '|';
    subColumnTitleRow += ':--:|'
  });

  let mainContent = `
### Public math modules
${columnTitleRow}
${subColumnTitleRow}`;

  let data = _.fileProvider.fileRead({
    filePath : abs('../data/GeneralPurpose.yml'),
    encoding : 'yaml',
  });

  let sortedData = sortTable(data);

  sortedData.forEach((lib, index) =>
  {
    mainContent += `
| ${index + 1} | [${lib.npmName}](${lib.repoUri}) | ${lib.binding ? '+' : '-'} | ${lib.solvesSLE ? '+' : '-'} |` +
`${lib.dependents} | ${lib.supportsNodejs ? '+' : '-'} | ${lib.supportsBrowser ? '+' : '-'} |`;
  });

  mainContent += `
### Public symbolic expression math modules
${columnTitleRow}
${subColumnTitleRow}
`;

  data = _.fileProvider.fileRead({
    filePath : abs('../data/SymbolicExpression.yml'),
    encoding : 'yaml',
  });

  sortedData = sortTable(data);

  sortedData.forEach((lib, index) =>
  {
    mainContent += `| ${index + 1} | [${lib.npmName}](${lib.repoUri}) | ${lib.binding ? '+' : '-'} | ${lib.solvesSLE ? '+' : '-'} |` +
` ${lib.dependents} | ${lib.supportsNodejs ? '+' : '-'} | ${lib.supportsBrowser ? '+' : '-'} |
`;
  });

  const title = _.fileProvider.fileRead({
    filePath : abs('../doc/title.md')
  });

  const links = _.fileProvider.fileRead({
    filePath : abs('../doc/resources.md'),
  });

  _.fileProvider.fileWrite({
    filePath : abs('../README.md'),
    data : title + mainContent + links
  });

  console.log( 'ReadMe created!' );
})();
