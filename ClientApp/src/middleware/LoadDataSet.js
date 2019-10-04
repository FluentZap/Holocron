const loadDataSet = (dispatch) => {
  let speciesSourceList = require.context('../dataset/Species/', true, /\.xml$/).keys();
  let speciesList = {};
  let promiseList = [];
  speciesSourceList.forEach(species => {
    promiseList.push(
      import(/* webpackMode: "eager" */ `../dataset/Species/${species.slice(2).replace('.xml', '')}.xml`).then(value => {
        let species = value.default.Species;
        species.Description[0] = parseSpecies(species.Description[0]);
        speciesList[species.Key] = species;
      })
    );
  });
  // console.log(species.slice(2).replace('.xml', ''));
  Promise.all(
    [
      Promise.all(promiseList).then(() => {
        // console.log(speciesList);
        return ['species', speciesList];
        // return speciesList;
      }),
    ]
  ).then(fullList => {
    let returnValue = {};
    fullList.forEach(([key, value]) => returnValue[key] = value);

    dispatch({
      type: 'SET_DATASET',
      dataSet: returnValue
    })
  })
}


function parseSpecies(s) {
  // s = s.replace('[H4]', '<h4>')
  // s = s.replace('[h4]', '</h4>')

  // s = s.replace('[P]', '<p>')
  // s = s.replace('[p]', '</p>')

  // s = s.replace('[B]', '<b>')
  // s = s.replace('[b]', '</b>')  
  s = s.replace(/\[H4\]/g, '<h4>')
  s = s.replace(/\[h4\]/g, '</h4>')
  
  s = s.replace(/\[H3\]/g, '<h3>')
  s = s.replace(/\[h3\]/g, '</h3>')

  s = s.replace(/\[P\]/g, '<p>')
  s = s.replace(/\[p\]/g, '</p>')

  s = s.replace(/\[B\]/g, '<b>')
  s = s.replace(/\[b\]/g, '</b>')
  return s;
}


export default loadDataSet;