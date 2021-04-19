import { registerRootComponent } from "expo";
import axios from "axios";
import { URL_PATH } from "@env";

axios.defaults.baseURL = `http://${URL_PATH}:3001` || "http://localhost:3001/";

import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);