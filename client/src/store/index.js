import { createStore } from "vuex";
import auth from "./modules/auth";
import wallet from "./modules/wallet";
import payment from "./modules/payment";

export default createStore({
  modules: {
    auth,
    wallet,
    payment,
  },
});
