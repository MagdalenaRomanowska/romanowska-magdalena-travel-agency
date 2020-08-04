import {connect} from 'react-redux';
import TripListOptions from './TripListOptions';
import {getAllTags} from '../../../redux/tagsRedux';
import {getAllFilters, changeSearchPhrase, changeDurationFrom, changeDurationTo, addTags, removeTags} from '../../../redux/filtersRedux';

const mapStateToProps = state => ({
  tags: getAllTags(state),
  filters: getAllFilters(state),
});

const mapDispatchToProps = dispatch => ({
  changeSearchPhrase: phrase => dispatch(changeSearchPhrase(phrase)),
  changeDurationFrom: (value) => dispatch(changeDurationFrom(value)),
  changeDurationTo: (value) => dispatch(changeDurationTo(value)),
  addTags: (tag, checked) => dispatch(addTags(tag, checked)),
  removeTags: (tag, checked) => dispatch(removeTags(tag, checked)),
  // TODO - add more dispatchers for other filters
});

export default connect(mapStateToProps, mapDispatchToProps)(TripListOptions);
