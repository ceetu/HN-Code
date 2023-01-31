import { shape, number, string, bool } from 'prop-types';

export const movieType = shape({
  booked: bool,
  currency: string.isRequired,
  director: string.isRequired,
  genre: string.isRequired,
  id: number.isRequired,
  image: string.isRequired,
  plot: string.isRequired,
  prices: shape({ 
    normal: number.isRequired, 
    superior: number.isRequired, 
    sofa: number.isRequired,
  }),
  stars: string.isRequired,
  title: string.isRequired,
});
