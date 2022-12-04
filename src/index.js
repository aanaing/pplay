import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { createRoot } from "react-dom/client";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const httpLink = new HttpLink({ uri: "https://powerplay.axra.app/v1/graphql" });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});
console.log("connected ......");
const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
);
