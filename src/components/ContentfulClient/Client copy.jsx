import * as contentful from 'contentful';

const client = contentful.createClient({
    space: 'hv2y56ee5hlc',
    environment: 'master', 
    accessToken: 'IOVmiy-ffyMrCg6mifuRoI3Mlcdm5VVNuu4W3I8R_Jg'
});

export default client;