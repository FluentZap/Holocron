const loadDataSet = (dispatch) => {
  let speciesSourceList = require.context('../dataset/Species/', true, /\.xml$/).keys();
  let speciesList = {};
  let speciesPromiseList = [];
  const images = require.context('../dataset/SpeciesImages/', true);
  const imagesKeys = images.keys();
  speciesSourceList.forEach(species => {
    speciesPromiseList.push(
      import(/* webpackMode: "eager" */ `../dataset/Species/${species.slice(2).replace('.xml', '')}.xml`).then(value => {
        let species = value.default.Species;
        species.Description[0] = parseXML(species.Description[0]);
        if (imagesKeys.includes(`./${species.Key}.png`)) {
          species.Image = images(`./${species.Key}.png`);
        } else {
          species.Image = images(`./Default.png`);
        }
        speciesList[species.Key] = species;
      })
    );
  });

  let careerSourceList = require.context('../dataset/Careers/', true, /\.xml$/).keys();
  let careerList = {};
  let careerPromiseList = [];
  careerSourceList.forEach(career => {
    careerPromiseList.push(
      import(/* webpackMode: "eager" */ `../dataset/Careers/${career.slice(2).replace('.xml', '')}.xml`).then(value => {
        let career = value.default.Career;
        career.Description[0] = parseXML(career.Description[0]);
        careerList[career.Key] = career;
      })
    );
  });

  let SpecializationSourceList = require.context('../dataset/Specializations/', true, /\.xml$/).keys();
  let SpecializationList = {};
  let SpecializationPromiseList = [];
  SpecializationSourceList.forEach(Specialization => {
    SpecializationPromiseList.push(
      import(/* webpackMode: "eager" */ `../dataset/Specializations/${Specialization.slice(2).replace('.xml', '')}.xml`).then(value => {
        let Specialization = value.default.Specialization;
        Specialization.Description[0] = parseXML(Specialization.Description[0]);
        SpecializationList[Specialization.Key] = Specialization;
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
      // char.Description[0] = parseXML(char.Description[0]);
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
      Promise.all(careerPromiseList).then(() => {
        return ['careers', careerList];
      }),
      Promise.all(speciesPromiseList).then(() => {
        return ['specializations', SpecializationList];
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