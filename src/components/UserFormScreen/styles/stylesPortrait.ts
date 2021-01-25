import {StyleSheet,} from 'react-native';

const stylesPortrait = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    flex: 1,
    margin: 25,
    backgroundColor: 'rgba(129, 129, 129, 0.95);',
    borderRadius: 20,
    padding: 10,
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
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems: 'center',
    marginVertical: 0,
    borderRadius: 5,
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
    height: 100,
    width: 100,
    elevation: 5,
    margin: 5,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fa9579',
  },   
  scrollContainer: {
    flex: 1,
    flexDirection:"row",
  },
  scroll: {
    flex: 1,
  },
  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    fontSize: 16,
    height: 30,
    color: 'black',
  },
  label: {
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fa9579',
  },
  button: {
    backgroundColor: '#ff7b54',
    marginTop: 100,
    padding: 10,
    alignContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#fa9579',
    height: 50,
    width: 120,
    elevation: 5,
    
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default stylesPortrait