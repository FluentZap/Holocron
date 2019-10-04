const loadDataSet = (dispatch) => {
  let speciesSourceList = require.context('../dataset/Species/', true, /\.xml$/).keys();
  let speciesList = {};
  let speciesPromiseList = [];
  speciesSourceList.forEach(species => {
    speciesPromiseList.push(
      import(/* webpackMode: "eager" */ `../dataset/Species/${species.slice(2).replace('.xml', '')}.xml`).then(value => {
        let species = value.default.Species;
        species.Description[0] = parseXML(species.Description[0]);
        speciesList[species.Key] = species;
      })
    );
  });

  let skillList = {};
  let skillPromise = import(/* webpackMode: "eager" */ `../dataset/Skills.xml`).then(value => {
    let skills = value.default.Skills.Skill;
    skills.forEach(skill => {
      skill.Description[0] = parseXML(skill.Description[0]);
      skillList[skill.Key] = skill;
    })
    // skillList = skills;
  })

  let characteristicList = {};
  let characteristicPromise = import(/* webpackMode: "eager" */ `../dataset/Characteristics.xml`).then(value => {    
    let chars = value.default.Characteristics.Characteristic;
    chars.forEach(char => {
      // char.Description[0] = parseXML(skill.Description[0]);
      characteristicList[char.Key] = char;
    })    
  })


  Promise.all(
    [
      Promise.all(speciesPromiseList).then(() => {
        // console.log(speciesList);
        return ['species', speciesList];
        // return speciesList;
      }),
      skillPromise.then(() => {
        return ['skills', skillList];
      }),
      characteristicPromise.then(() => {
        return ['characteristics', characteristicList];
      }),
    ]
  ).then(fullList => {
    let returnValue = {};
    fullList.forEach(([key, value]) => returnValue[key] = value);
    console.log(returnValue);

    dispatch({
      type: 'SET_DATASET',
      dataSet: returnValue
    })
  })
}


function parseXML(s) {
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