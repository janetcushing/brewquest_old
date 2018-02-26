import axios from "axios";



let url =
  "http://api.brewerydb.com/v2/locations?";

const apiKey = "key=32c6dc015d7cf847c9bd1c05f34160ee"
const format = "&format=json";
// const type = "&type=brewery";
// const q = "&querystring";

const ApiSearch = props => {
  let postalCode = "&postalCode=" + { props.zipCode };
  url += apiKey;
  url += format;
  url += postalCode;

  axios
    .get(url)
    .then(response => {
      console.log(
        `locationTypeDisplay: ${response.data[0].locationTypeDisplay} -`,
        `latitude: ${response.data[0].latitude} -`,
        `longitude: ${response.data[0].longitude} -`,
        `name: ${response.data[0].brewery.name}`,
        `website: ${response.data[0].website} -`,
        `phone: ${response.data[0].phone} -`,
        `locationType: ${response.data[0].locationType} -`,
        `description: ${response.data[0].description} -`,
        `locality: ${response.data[0].locality} -`,
        `streetAddress: ${response.data[0].streetAddress} -`,
      );
    })
    .catch(error => {
      console.log(error);
    });
}
export default ApiSearch;