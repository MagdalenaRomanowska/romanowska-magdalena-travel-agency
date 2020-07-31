import {connect} from 'react-redux';
import TripListOptions from './TripListOptions';
import {getAllTags} from '../../../redux/tagsRedux';
import {getAllFilters, changeSearchPhrase, changeDurationFrom, changeDurationTo, changeTags} from '../../../redux/filtersRedux';

const mapStateToProps = state => ({
  tags: getAllTags(state),
  filters: getAllFilters(state),
});

const mapDispatchToProps = dispatch => ({
  changeSearchPhrase: phrase => dispatch(changeSearchPhrase(phrase)),
  //changeDuration: (type) => dispatch(changeDuration(type)),
  changeDurationFrom: (value) => dispatch(changeDurationFrom(value)),
  changeDurationTo: (value) => dispatch(changeDurationTo(value)),
  changeTags: (tag, checked) => dispatch(changeTags(tag, checked)),
  // TODO - add more dispatchers for other filters
});

export default connect(mapStateToProps, mapDispatchToProps)(TripListOptions);
