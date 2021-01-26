import { StyleSheet, } from 'react-native';

const styles = StyleSheet.create({
  keyboard: {

    flex: 1,
    flexGrow: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)'

  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 22
  },
  modalView: {
    alignItems: 'center',
    maxHeight: 500,
    justifyContent: 'center',
    flex: 1,
    margin: 35,
    backgroundColor: 'rgba(200, 129, 129, 0.80)',
    borderRadius: 20,
    padding: 20,
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
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: 'rgba(110,110,110, 0.5)',
    borderRadius: 20,
    padding: 10,
    fontSize: 16,
    height: 40,
    color: 'white',
  },
  label: {
    paddingVertical: 5,
    marginTop: 30,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    backgroundColor: 'rgba(110,110,150, 0.5)',
    marginTop: 35,
    padding: 10,
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    width: 90,
    elevation: 5,
    margin: 5,
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default styles