const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
    //właściwość url stworzy odpowiedni adres, rozpoznając, 
    //czy uruchomiliśmy projekt w środowisku developerskim, czy na serwerze.
    endpoint: {
      orders: 'orders',
    },
  },
};
  
export default settings;