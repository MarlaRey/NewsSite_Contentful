//denne client bruges til at kommunikere med Contentful's API for at hente data fra Contentful.
import { createClient } from 'contentful'; 

// bruger createClient-funktionen til at oprette en klientinstans til at kommunikere med Contentful's API.
const client = createClient({
    space: 'hv2y56ee5hlc',
    environment: 'master',
    accessToken: 'IOVmiy-ffyMrCg6mifuRoI3Mlcdm5VVNuu4W3I8R_Jg'
});

export default client;