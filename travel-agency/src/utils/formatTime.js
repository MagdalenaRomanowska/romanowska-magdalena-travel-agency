export const formatTime = parameter => {
  if (parameter==undefined || isNaN(parameter) || parameter < 0){
    return null;
  } else {
    let hours = (('00' + Math.floor(parameter/3600)).substr(-2,2));
    let minutes = (('00' + Math.floor((parameter/60)%60)).substr(-2,2));
    let seconds = (('00' + Math.floor(parameter%60)).substr(-2,2));
    let time = hours + ':' +  minutes + ':' + seconds;
    return time;
  }  
};

// zero padding: https://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
// ("0000" + num).substr(-4,4); // 1st comment.
// hours:   (('00' + (Math.floor(parameter/3600))).substr(-2,2))
// minutes: (('00' + (Math.floor((parameter/60)%60))).substr(-2,2))
// seconds: (('00' + (Math.floor(parameter%60))).substr(-2,2))

// składnia str.substr(start[, length]) - Zwraca określoną liczbę początkowych znaków w łańcuchu znaków w określonej lokalizacji.
// start - Lokalizacja, w której rozpoczyna się wyciąganie znaków (wartość liczbowa pomiędzy 0, a jeden znak mniej niż długość łańcucha znaków).
// length - Liczba znaków do wyciągnięcia.