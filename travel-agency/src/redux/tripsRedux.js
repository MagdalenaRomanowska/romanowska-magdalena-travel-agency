/* SELECTORS */

export const getAllTrips = ({trips}) => trips;

export const getFilteredTrips = ({trips, filters}) => {
  let output = trips;

  // filter by search phrase
  if(filters.searchPhrase){
    const pattern = new RegExp(filters.searchPhrase, 'i');
    output = output.filter(trip => pattern.test(trip.name));
  }

  // TODO - filter by duration
  if(filters.duration){
    const durationTime = filters.duration;
    const durationTimeFrom = filters.duration.from;
    const durationTimeTo = filters.duration.to;
    console.log('durationTime:', durationTime);
    output = output.filter(trip => trip.days >= durationTimeFrom && trip.days <= durationTimeTo);
  }
   
  // TODO - filter by tags
  if(filters.tags){
    for (let i=0; i <= filters.tags.length-1; i++){
      const tag = filters.tags[i];
      output = output.filter(trip => trip.tags.includes(tag));
    }
  }
  // TODO - sort by cost descending (most expensive goes first)
  output = output.sort(compareTrips);

  return output;
};

function compareTrips(trip1, trip2) { //porównuję 2 tripy dla sortowania.
  let replacedDollar1 = trip1.cost.replace('$', ''); //zamieniam stringi na liczby.
  let replacedDollar2 = trip2.cost.replace('$', '');
  let replacedComma1 = replacedDollar1.replace(',', '');//zamieniam stringi na liczby.
  let replacedComma2 = replacedDollar2.replace(',', '');
  let trip01 = replacedComma1 *1; //mnożę razy 1 dla pewności że to liczba.
  let trip02 = replacedComma2 *1;

  if (trip01 > trip02){
    return -1;
  }
  if (trip01 < trip02){
    return 1;
  }
  return 0;
}

export const getTripById = ({trips}, tripId) => {
  const filtered = trips.filter(trip => trip.id == tripId);
  // TODO - filter trips by tripId
  console.log('tripId:', tripId);
  console.log('filtered:', filtered);
  return filtered.length ? filtered[0] : {error: true};
};

export const getTripsForCountry = ({trips}, countryCode) => {
  const filtered = trips.filter(trip => trip.country.code == countryCode);
  // TODO - filter trips by countryCode
  console.log('countryCode:', countryCode);
  console.log('filtered:', filtered);
  return filtered.length ? filtered : [{error: true}];
};

/* ACTIONS */

/*
// action name creator
const reducerName = 'trips';
const createActionName = name => `app/${reducerName}/${name}`;

// action types


// action creators


// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}
 */
