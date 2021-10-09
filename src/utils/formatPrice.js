//zawiera funkcję, która formatuje otrzymaną w argumencie liczbę do odpowiedniego formatu – w tym przypadku, zaokrągla liczbę oraz stosuje amerykańską notację liczb (przecinki jako separatory tysięcy) i dodaje symbol waluty ($). Jeśli do funkcji formatPrice przekazano nie-liczbę, czyli np. tekst, to taki argument zostanie zwrócony bez wprowadzania zmian.

export const formatPrice = price => {
  return typeof(price) != 'number'
    ? price
    : Math.ceil(price)
      .toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
};
