import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { IconContext } from 'react-icons';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import StarIcon from '@mui/icons-material/Star';

import css from './SectionMovieDetails.module.scss';

import tmdbConfigs from 'api/configs/tmdb.configs';

export const SectionMovieDetails = ({ movieInfo }) => {
  const {
    title,
    release_date: date,
    vote_average,
    overview,
    genres,
    backdrop_path: backdrop,
    poster_path: poster,
    production_countries,
    runtime,
    vote_average: rating,
  } = movieInfo;

  const { themeMode } = useSelector(state => state.themeMode);

  const produceCountries = production_countries
    ?.map(country => country.iso_3166_1)
    .join(', ');
  const allGenres = genres.map(genre => genre.name).join(', ');

  const location = useLocation();
  const navigation = useNavigate();

  const onBtnClick = () => {
    navigation(location?.state?.from ?? '/');
  };

  return (
    <section
      style={{
        backgroundImage: `url(${tmdbConfigs.backdropPath(backdrop || poster)})`,
      }}
      className={css.section}
    >
      <div className={css.wrapper}>
        <div className="container">
          <button
            className={css.details__btn}
            type="button"
            onClick={onBtnClick}
          >
            <IconContext.Provider value={{ size: '20px' }}>
              <AiOutlineArrowLeft className={css.details__icon} />
            </IconContext.Provider>
            Go back
          </button>

          <div className={css.details__container}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${poster}`}
              alt={title}
              width="300px"
              heigth="450px"
            />
            <div className={css.details}>
              <h2 className={css.details__title}>
                {`${title}`}{' '}
                <span style={{ fontWeight: 400, opacity: 0.8 }}>
                  {date ? `(${parseInt(date)})` : null}
                </span>
              </h2>
              <ul className={css.list}>
                {date ? <li className={css.list__item}>{date}</li> : null}
                {produceCountries ? (
                  <li className={css.list__item}>{`(${produceCountries})`}</li>
                ) : null}
                {allGenres ? <li>{allGenres}</li> : null}
                {runtime ? <li>{<NumberToTime number={runtime} />}</li> : null}
              </ul>
              <Stack className={css.rating}>
                <Rating
                  name="read-only"
                  size="large"
                  color="#fff"
                  defaultValue={rating / 2}
                  precision={0.5}
                  readOnly
                  className={css[`rating__icon__${themeMode}`]}
                />
                <p className={css[`rating__text__${themeMode}`]}>
                  {rating ? rating.toFixed(2) : null}
                </p>
              </Stack>
              <b>Overview</b>
              <p>{overview}</p>
            </div>
          </div>
          <div className={css.additional}>
            <p className={css.additional__title}>Additional information</p>
            <ul>
              <li>
                {/* <Link
                  className={css.additional__link}
                  to="cast"
                  state={location.state}
                >
                  Cast
                </Link> */}
              </li>
              <li>
                <Link
                  className={css.additional__link}
                  to="reviews"
                  state={location.state}
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

const NumberToTime = props => {
  const hours = Math.floor(props.number / 60);
  const minutes = props.number % 60;

  return (
    <span>
      {hours}h {minutes}m
    </span>
  );
};

export default NumberToTime;
