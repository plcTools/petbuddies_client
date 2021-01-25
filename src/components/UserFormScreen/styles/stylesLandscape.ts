import {StyleSheet,} from 'react-native';

const stylesLandscape = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    flex: 1,
    margin: 25,
    backgroundColor: 'rgba(129, 129, 129, 0.95);',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  headContainer: {
    alignItems: 'center',
  },
  buttonPhoto: {
    backgroundColor: 'white',
    marginTop: 20,
    padding: 10,
    alignContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#fa9579',
    height: 80,
    width: 80,
    elevation: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fa9579',
  },
   scrollContainer: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    fontSize: 20,
    height: 40,
    color: 'white',
  },
  label: {
    paddingVertical: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fa9579',
  },
  button: {
    backgroundColor: '#ff7b54',
    marginTop: 20,
    padding: 10,
    alignContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#fa9579',
    height: 50,
    width: 150,
    elevation: 5,
    margin: 5,
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default stylesLandscape