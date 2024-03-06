import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../components/Metrics';

const { width, height } = Dimensions.get('window');

const Styles = StyleSheet.create({
  header: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    fontFamily: "comic sans ms",
    marginBottom: verticalScale(10),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: horizontalScale(2),
  },
  input: {
    height: verticalScale(40),
    width: horizontalScale(80),
    marginBottom: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    minWidth: horizontalScale(178),
    maxWidth: horizontalScale(500),
    color: 'gray',
  },
  text: {
    color: 'black',
    fontSize: moderateScale(12),
    fontFamily: "comic sans ms"
  },
  textcontainer: {
    alignItems: 'center',
    backgroundColor: 'pink',
    border: '2px solid black',
    borderRadius: moderateScale(15),
    padding: moderateScale(10),
    maxWidth: horizontalScale(670),
    maxHeight: verticalScale(500),
    minHeight: verticalScale(100),
    height: 'auto',
    minWidth: horizontalScale(280),
  },
  button: {
    backgroundColor: 'lightgreen',
    padding: moderateScale(6),
    borderRadius: moderateScale(5),
    marginTop: verticalScale(10),
    width: horizontalScale(150),
    alignItems: 'center',
    border: "1px solid darkgreen",
  },
  scoreButton: {
    backgroundColor: 'orange',
    padding: moderateScale(6),
    borderRadius: moderateScale(5),
    marginTop: verticalScale(10),
    width: horizontalScale(150),
    alignItems: 'center',
    border: "1px solid darkgreen",
  },
  resetButton: {
    backgroundColor: 'lightcoral',
    padding: moderateScale(6),
    borderRadius: moderateScale(5),
    marginTop: verticalScale(10),
    width: horizontalScale(150),
    alignItems: 'center',
    border: "1px solid darkgreen",
  },
  diceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: horizontalScale(2),
    height: 'auto',
  },
  pointContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: horizontalScale(2),
    height: 'auto',
  },
  pointdicecontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: horizontalScale(2),
    height: 'auto',
    backgroundColor: 'pink',
    border: '2px solid black',
    borderRadius: moderateScale(15),
    maxWidth: horizontalScale(650),
    minWidth: horizontalScale(320),
  },
});

export default Styles;