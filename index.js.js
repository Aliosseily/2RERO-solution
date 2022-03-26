const input = `
2
3 3 2 1
1 2
3 1
2 3
6 6 2 5
1 3
3 4
2 4
1 2
2 3
5 6
`;

roadsAndLibraries(input);

function roadsAndLibraries(input) {
  var transformInput = input.trim().split("\n");
  const numberOfQueries = transformInput[0];
  // remove first element from transformInput array (numberOfQueries )
  var transformInput = transformInput.splice(1, transformInput.length);

  // get the index of of each query
  var queryIndex = [];
  var filtered = transformInput.filter((e, i) => {
    if (e.length === 7) {
      queryIndex.push(i);
    }
  });
  // insert each query array in to queries array
  let queries = [];
  for (let t = 0; t < queryIndex.length; t++) {
    queries.push(transformInput.slice(queryIndex[t], queryIndex[t + 1]));
  }
  // loop over queries array to get the formatted shape of queries array
  let formattedQueries = [];
  for (let i = 0; i < queries.length; i++) {
    for (let j = 0; j < queries[i].length; j++) {
      if (j === 0) {
        formattedQueries.push(queries[i][j]);
      } else {
        formattedQueries.push([queries[i][j][0], queries[i][j][2]]);
      }
    }
  }
  // split formattedQueries array into multiple arrays (number of queries)
  let splittedFormattedQueries = [];
  for (let t = 0; t < queryIndex.length; t++) {
    splittedFormattedQueries.push(
      formattedQueries.slice(queryIndex[t], queryIndex[t + 1])
    );
  }

  let finalQueriesArray = [];
  for (let i = 0; i < splittedFormattedQueries.length; i++) {
    let query = {};
    let roads = [];
    query.n = splittedFormattedQueries[i][0][0];
    query.m = splittedFormattedQueries[i][0][2];
    query.Clib = splittedFormattedQueries[i][0][4];
    query.Croad = splittedFormattedQueries[i][0][6];
    splittedFormattedQueries[i].shift();
    for (let j = 0; j < splittedFormattedQueries[i].length; j++) {
      roads.push(splittedFormattedQueries[i][j].map((x) => parseInt(x)));
    }
    query.roads = roads;
    finalQueriesArray.push(query);
  }

  for (let i = 0; i < finalQueriesArray.length; i++) {
    const sum = (a) => a.reduce((r, x) => r + x);
    let prevSum = 0;
    const n_cities = +finalQueriesArray[i].n;
    const c_lib = +finalQueriesArray[i].Clib;
    const c_road = +finalQueriesArray[i].Croad;
    const cities = finalQueriesArray[i].roads;

    cities.sort(function (a, b) {
      if (a[0] > b[0]) return 1;
      if (a[0] < b[0]) return -1;
      if (a[1] > b[1]) return 1;
      if (a[1] < b[1]) return -1;
      return 0;
    });

    const roadsToBeRepaired = [];
    for (let i = 0; i < cities.length; i++) {
      if (i === 0 || sum(cities[i]) >= prevSum + 2) {
        prevSum = sum(cities[i]);
        roadsToBeRepaired.push(cities[i]);
      }
    }

    const roadsToBeRepairedCost = roadsToBeRepaired.length * c_road;

    let numberOflibrariesToBuild = roadsToBeRepaired.length - 1;
    if (roadsToBeRepaired.length === 1) {
      numberOflibrariesToBuild = 1;
    }

    const librariesToBeBuildCost = numberOflibrariesToBuild * c_lib;

    const librariesToBeBuildInEveryCityCost = n_cities * c_lib;

    const totalRoadsAndLibaraiesCost =
      roadsToBeRepairedCost + librariesToBeBuildCost;

    if (totalRoadsAndLibaraiesCost < librariesToBeBuildInEveryCityCost) {
      console.log(totalRoadsAndLibaraiesCost);
    } else {
      console.log(librariesToBeBuildInEveryCityCost);
    }
  }
}
