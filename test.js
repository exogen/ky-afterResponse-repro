const ky = require("ky-universal");
const fetch = require("node-fetch");

async function run() {
  const input = "https://graphbrainz.herokuapp.com/";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
query IntrospectionQuery {
  __schema {
    queryType { name }
    mutationType { name }
    subscriptionType { name }
    types {
      ...FullType
    }
    directives {
      name
      description
      locations
      args {
        ...InputValue
      }
    }
  }
}

fragment FullType on __Type {
  kind
  name
  description
  fields(includeDeprecated: true) {
    name
    description
    args {
      ...InputValue
    }
    type {
      ...TypeRef
    }
    isDeprecated
    deprecationReason
  }
  inputFields {
    ...InputValue
  }
  interfaces {
    ...TypeRef
  }
  enumValues(includeDeprecated: true) {
    name
    description
    isDeprecated
    deprecationReason
  }
  possibleTypes {
    ...TypeRef
  }
}

fragment InputValue on __InputValue {
  name
  description
  type { ...TypeRef }
  defaultValue
}

fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
      }
    }
  }
}`
    }),
    hooks: {
      // Commenting out the following line makes it work:
      afterResponse: [response => {}]
    }
  };
  // Changing the following to `fetch` also makes it work:
  const promise = ky(input, options);
  console.log("got response promise");
  const response = await promise;
  console.log("done with response!");
  const payload = await response.json();
  console.log("decoded response!");
  console.log(payload);
  console.log("fin.");
}

run().then(
  () => process.exit(0),
  err => {
    console.error("error!");
    console.error(err);
    process.exit(1);
  }
);
