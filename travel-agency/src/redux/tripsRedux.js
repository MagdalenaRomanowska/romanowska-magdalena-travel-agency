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
    console.log('durationTimeFrom:', durationTimeFrom);
    const durationTimeTo = filters.duration.to;
    console.log('durationTimeTo:', durationTimeTo);
    console.log('durationTime:', durationTime);
    output = output.filter(trip => trip.days >= durationTimeFrom && trip.days <= durationTimeTo);
  //   const pattern = new RegExp(filters.duration, 'i');
  //   output = output.filter(trip => pattern.test(trip.name));
  }
   
  // TODO - filter by tags
  if(filters.tags){
    const firstTag = filters.tags[0];
    output = output.filter(trip => trip.tags.includes(firstTag));
  }
  // TODO - sort by cost descending (most expensive goes first)

  return output;
};

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
